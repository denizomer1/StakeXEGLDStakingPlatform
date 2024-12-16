multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::contract]
pub trait StakeX {
    #[init]
    fn init(&self, initial_apy: BigUint) {
        self.apy().set(initial_apy);
    }

    // Staking Functions
    #[endpoint]
    #[payable("EGLD")]
    fn stake(&self) {
        let caller = self.blockchain().get_caller();
        let payment_amount = self.call_value().egld_value();
        
        require!(payment_amount > 0, "Must stake more than 0 EGLD");

        // Update user's staking position
        let mut staking_position = self.staking_positions(&caller).get();
        staking_position.amount += payment_amount;
        staking_position.last_action_block = self.blockchain().get_block_nonce();

        self.staking_positions(&caller).set(staking_position);
        self.total_staked().update(|total| *total += payment_amount);
    }

    #[endpoint]
    fn unstake(&self, amount: BigUint) {
        let caller = self.blockchain().get_caller();
        let mut staking_position = self.staking_positions(&caller).get();

        require!(staking_position.amount >= amount, "Insufficient staked amount");

        // Calculate and transfer rewards
        let rewards = self.calculate_rewards(&caller);
        if rewards > 0 {
            self.send().direct_egld(&caller, &rewards);
        }

        // Update staking position
        staking_position.amount -= &amount;
        staking_position.last_action_block = self.blockchain().get_block_nonce();
        self.staking_positions(&caller).set(staking_position);

        // Transfer unstaked tokens
        self.send().direct_egld(&caller, &amount);
        self.total_staked().update(|total| *total -= &amount);
    }

    #[endpoint]
    fn claim_rewards(&self) {
        let caller = self.blockchain().get_caller();
        let rewards = self.calculate_rewards(&caller);

        require!(rewards > 0, "No rewards to claim");

        // Reset last action block to current block
        let mut staking_position = self.staking_positions(&caller).get();
        staking_position.last_action_block = self.blockchain().get_block_nonce();
        self.staking_positions(&caller).set(staking_position);

        // Transfer rewards
        self.send().direct_egld(&caller, &rewards);
    }

    // Helper Functions
    fn calculate_rewards(&self, user: &ManagedAddress) -> BigUint {
        let staking_position = self.staking_positions(user).get();
        let current_block = self.blockchain().get_block_nonce();
        let blocks_staked = current_block - staking_position.last_action_block;
        
        let apy = self.apy().get();
        let reward = &staking_position.amount * &apy * blocks_staked / 
                     BigUint::from(10_000_000_000u64); // Scaling factor for precision

        reward
    }

    // Admin Functions
    #[only_owner]
    #[endpoint]
    fn set_apy(&self, new_apy: BigUint) {
        self.apy().set(new_apy);
    }

    // View Functions
    #[view]
    fn get_staked_amount(&self, user: ManagedAddress) -> BigUint {
        self.staking_positions(&user).get().amount
    }

    #[view]
    fn get_apy(&self) -> BigUint {
        self.apy().get()
    }

    // Storage Mappers
    #[storage_mapper("stakingPositions")]
    fn staking_positions(&self, user: &ManagedAddress) -> SingleValueMapper<StakingPosition<Self::Api>>;

    #[storage_mapper("totalStaked")]
    fn total_staked(&self) -> SingleValueMapper<BigUint>;

    #[storage_mapper("apy")]
    fn apy(&self) -> SingleValueMapper<BigUint>;
}

// Custom Types
#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakingPosition<M: ManagedTypeApi> {
    pub amount: BigUint<M>,
    pub last_action_block: u64,
}

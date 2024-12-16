import React, { useState, useEffect } from 'react';
import { 
  WebWalletProvider, 
  useGetLoginInfo, 
  useGetAccountInfo 
} from '@multiversx/sdk-web-wallet-provider';

const StakeXApp: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [currentApy, setCurrentApy] = useState(0);

  const { loginInfo } = useGetLoginInfo();
  const { account } = useGetAccountInfo();

  const connectWallet = async () => {
    const provider = new WebWalletProvider();
    await provider.init();
    await provider.login();
  };

  const stakeTokens = async () => {
    // Interaction with smart contract stake function
    try {
      // MultiversX contract interaction logic
    } catch (error) {
      console.error('Staking failed', error);
    }
  };

  const unstakeTokens = async () => {
    try {
      // MultiversX contract interaction for unstaking
    } catch (error) {
      console.error('Unstaking failed', error);
    }
  };

  const claimRewards = async () => {
    try {
      // MultiversX contract interaction for claiming rewards
    } catch (error) {
      console.error('Reward claiming failed', error);
    }
  };

  useEffect(() => {
    // Fetch staking details when wallet is connected
    if (loginInfo?.isLoggedIn) {
      // Fetch staked balance, pending rewards, current APY
    }
  }, [loginInfo]);

  return (
    <div className="stakex-app">
      <h1>StakeX - EGLD Staking Platform</h1>
      
      {!loginInfo?.isLoggedIn ? (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="staking-dashboard">
            <h2>Staking Dashboard</h2>
            <p>Staked Balance: {stakedBalance} EGLD</p>
            <p>Pending Rewards: {pendingRewards} EGLD</p>
            <p>Current APY: {currentApy}%</p>
          </div>

          <div className="stake-actions">
            <input 
              type="number" 
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter EGLD amount to stake"
            />
            <button onClick={stakeTokens}>Stake</button>

            <input 
              type="number" 
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              placeholder="Enter EGLD amount to unstake"
            />
            <button onClick={unstakeTokens}>Unstake</button>

            <button onClick={claimRewards}>Claim Rewards</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StakeXApp;

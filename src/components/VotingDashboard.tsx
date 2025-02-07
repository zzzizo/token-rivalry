// src/app/components/VotingDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Charity {
    id: number;
    name: string;
    description: string;
    votes: number;
    imageUrl: string;
}

export default function VotingDashboard() {
    const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
    const [address, setAddress] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAddress(address);
                setIsConnected(true);
            } else {
                alert('Please install MetaMask to use this feature');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    useEffect(() => {
        // Check if wallet is already connected
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                try {
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setAddress(accounts[0].address);
                        setIsConnected(true);
                    }
                } catch (error) {
                    console.error('Error checking wallet connection:', error);
                }
            }
        };

        checkConnection();
    }, []);

    // Sample data - Replace with your contract data
    const charities: Charity[] = [
        {
            id: 1,
            name: "Cat Shelter Foundation",
            description: "Supporting homeless cats across the globe",
            votes: 2840,
            imageUrl: "/api/placeholder/400/200"
        },
        {
            id: 2,
            name: "Dog Rescue International",
            description: "Providing care for abandoned dogs worldwide",
            votes: 3150,
            imageUrl: "/api/placeholder/400/200"
        },
        {
            id: 3,
            name: "Pet Food Bank",
            description: "Ensuring no pet goes hungry during tough times",
            votes: 1960,
            imageUrl: "/api/placeholder/400/200"
        }
    ];

    const totalVotes = charities.reduce((sum, charity) => sum + charity.votes, 0);

    const handleVote = async (charityId: number) => {
        try {
            if (!isConnected) {
                alert('Please connect your wallet first');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Add your contract interaction here
            // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            // await contract.vote(charityId);

            setSelectedCharity(charityId);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const getVotePercentage = (votes: number) => {
        return ((votes / totalVotes) * 100).toFixed(1);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Charity Voting</h2>
                    {!isConnected ? (
                        <button
                            onClick={connectWallet}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Connect Wallet
                        </button>
                    ) : (
                        <div className="text-sm text-gray-500">
                            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                        </div>
                    )}
                </div>

                {!isConnected ? (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center text-blue-800">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Connect your wallet and hold CATGUETTE or DOGUETTE tokens to participate in voting.</p>
                        </div>
                    </div>
                ) : (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center text-green-800">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Your wallet is connected. You can now vote for your preferred charity.</p>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    {charities.map((charity) => (
                        <div
                            key={charity.id}
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{charity.name}</h3>
                                    <p className="text-gray-600">{charity.description}</p>
                                </div>
                                <img
                                    src={charity.imageUrl}
                                    alt={charity.name}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Votes: {charity.votes.toLocaleString()}</span>
                                    <span>{getVotePercentage(charity.votes)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                        style={{ width: `${getVotePercentage(charity.votes)}%` }}
                                    />
                                </div>

                                <button
                                    className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${!isConnected || selectedCharity === charity.id
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    disabled={!isConnected || selectedCharity === charity.id}
                                    onClick={() => handleVote(charity.id)}
                                >
                                    {selectedCharity === charity.id ? 'Voted' : 'Vote'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-4 text-gray-800">Current Voting Period</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Total Votes</p>
                            <p className="font-medium text-gray-800">{totalVotes.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Pool Amount</p>
                            <p className="font-medium text-gray-800">156.8 MATIC</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Voting Ends</p>
                            <p className="font-medium text-gray-800">March 31, 2025</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Quarter</p>
                            <p className="font-medium text-gray-800">Q1 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
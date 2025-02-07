import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PawPrint, Calendar, Timer, DollarSign } from 'lucide-react';

// Mock data for charitable organizations
const charities = [
    {
        id: 1,
        name: "Happy Paws Shelter",
        description: "Supporting homeless cats and dogs with medical care and shelter",
        category: "Animal Welfare",
        votes: 2345,
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 2,
        name: "Feline Friends Network",
        description: "Providing food and medical care to street cats",
        category: "Cat Care",
        votes: 1890,
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 3,
        name: "Canine Care Initiative",
        description: "Supporting dog shelters and rescue operations",
        category: "Dog Care",
        votes: 2100,
        imageUrl: "/api/placeholder/400/300"
    }
];

const VotingDashboard = () => {
    const [selectedCharity, setSelectedCharity] = useState(null);
    const totalVotes = charities.reduce((sum, charity) => sum + charity.votes, 0);
    const timeLeft = "15 days"; // Mock time remaining
    const poolAmount = "125,000 MATIC"; // Mock pool amount

    const handleVote = (charityId) => {
        // Here you would implement the actual voting logic
        console.log(`Voted for charity ${charityId}`);
        // You would typically call a smart contract method here
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid gap-6">
                {/* Voting Status Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-4">
                                <Timer className="h-8 w-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Time Remaining</p>
                                    <p className="text-2xl font-bold">{timeLeft}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-4">
                                <DollarSign className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Current Pool</p>
                                    <p className="text-2xl font-bold">{poolAmount}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-4">
                                <PawPrint className="h-8 w-8 text-purple-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Total Votes</p>
                                    <p className="text-2xl font-bold">{totalVotes.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charities Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {charities.map((charity) => (
                        <Card key={charity.id} className="overflow-hidden">
                            <img
                                src={charity.imageUrl}
                                alt={charity.name}
                                className="w-full h-48 object-cover"
                            />
                            <CardHeader>
                                <CardTitle>{charity.name}</CardTitle>
                                <p className="text-sm text-gray-500">{charity.category}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{charity.description}</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span>Current Votes</span>
                                        <span className="font-medium">
                                            {charity.votes.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress
                                        value={(charity.votes / totalVotes) * 100}
                                        className="h-2"
                                    />
                                    <Button
                                        className="w-full"
                                        onClick={() => handleVote(charity.id)}
                                    >
                                        Vote for {charity.name}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Rules Section */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Voting Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Each token represents one vote</li>
                            <li>Voting period lasts for 3 months</li>
                            <li>1% of all transaction fees go to the winning charity</li>
                            <li>You must hold tokens to participate in voting</li>
                            <li>Votes are final and cannot be changed once submitted</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VotingDashboard;
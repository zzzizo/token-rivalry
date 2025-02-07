import React, { useState } from 'react';
import { Dog, Cat, Wallet, Trophy, LineChart, Users, ChartLine } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TokenStats {
    price: number;
    volume: number;
    holders: number;
    marketCap: number;
    priceHistory: Array<{
        date: string;
        price: number;
    }>;
    topHolders: Array<{
        address: string;
        amount: number;
    }>;
}

interface DashboardProps {
    data: {
        catguette: TokenStats;
        doguette: TokenStats;
    };
}

interface IconProps {
    className?: string;
}

// Helper Components with proper TypeScript types
const StatItem: React.FC<{
    icon: React.ReactElement<IconProps>;
    label: string;
    value: string;
}> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[var(--muted)]">
            {React.cloneElement(icon, { className: 'w-4 h-4' } as IconProps)}
            {label}
        </span>
        <span className="font-bold">{value}</span>
    </div>
);

const HoldersList: React.FC<{
    title: string;
    holders: TokenStats['topHolders'];
}> = ({ title, holders }) => (
    <div>
        <h3 className="font-bold mb-4">{title}</h3>
        {holders.map((holder, index) => (
            <div key={index} className="flex justify-between mb-2 p-3 bg-[var(--accent)] rounded-lg">
                <span className="text-[var(--muted)]">{holder.address}</span>
                <span className="font-medium">{holder.amount.toLocaleString()}</span>
            </div>
        ))}
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<'price' | 'holders' | 'voting'>('price');

    const totalVolume = data.catguette.volume + data.doguette.volume;
    const catDominance = (data.catguette.volume / totalVolume) * 100;
    const dogDominance = (data.doguette.volume / totalVolume) * 100;

    return (
        <div className="space-y-6">
            {/* Dominance Bar */}
            <div className="card">
                <h2 className="text-xl font-bold mb-6">Faction Dominance</h2>
                <div className="flex items-center gap-4">
                    <Cat className="w-8 h-8 text-[var(--primary)]" />
                    <div className="flex-1 h-8 bg-[var(--accent)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--primary)] transition-all duration-500"
                            style={{ width: `${catDominance}%` }}
                        />
                    </div>
                    <Dog className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <div className="flex justify-between mt-4 text-sm font-medium">
                    <span>Catguette: {catDominance.toFixed(1)}%</span>
                    <span>Doguette: {dogDominance.toFixed(1)}%</span>
                </div>
            </div>

            {/* Token Stats */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Catguette Stats */}
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Catguette</h2>
                        <Cat className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div className="space-y-6">
                        <StatItem icon={<ChartLine />} label="Price" value={`$${data.catguette.price.toFixed(4)}`} />
                        <StatItem icon={<Trophy />} label="Volume" value={`$${data.catguette.volume.toLocaleString()}`} />
                        <StatItem icon={<Users />} label="Holders" value={data.catguette.holders.toLocaleString()} />
                    </div>
                </div>

                {/* Doguette Stats */}
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Doguette</h2>
                        <Dog className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div className="space-y-6">
                        <StatItem icon={<ChartLine />} label="Price" value={`$${data.doguette.price.toFixed(4)}`} />
                        <StatItem icon={<Trophy />} label="Volume" value={`$${data.doguette.volume.toLocaleString()}`} />
                        <StatItem icon={<Users />} label="Holders" value={data.doguette.holders.toLocaleString()} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="card">
                <div className="flex border-b border-[var(--border-color)]">
                    {(['price', 'holders', 'voting'] as const).map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-4 px-6 text-center transition-colors ${activeTab === tab
                                ? 'border-b-2 border-[var(--primary)] text-[var(--primary)] font-semibold'
                                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} History
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === 'price' && (
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis dataKey="date" stroke="var(--muted)" />
                                    <YAxis stroke="var(--muted)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card-bg)',
                                            border: '1px solid var(--border-color)'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        data={data.catguette.priceHistory}
                                        dataKey="price"
                                        stroke="var(--primary)"
                                        name="Catguette"
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        data={data.doguette.priceHistory}
                                        dataKey="price"
                                        stroke="#10B981"
                                        name="Doguette"
                                        dot={false}
                                    />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {activeTab === 'holders' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <HoldersList title="Catguette Top Holders" holders={data.catguette.topHolders} />
                            <HoldersList title="Doguette Top Holders" holders={data.doguette.topHolders} />
                        </div>
                    )}

                    {activeTab === 'voting' && (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-bold mb-2">Next Charity Vote Coming Soon</h3>
                            <p className="text-[var(--muted)] mb-6">Connect your wallet to participate in community voting</p>
                            <button className="inline-flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity">
                                <Wallet className="w-4 h-4" />
                                Connect Wallet
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import { Card, CardContent, CardHeader } from "./ui/card";
import { Address } from "@/lib/types/market";
import { Avatar } from "./avatar";
import { addEllipsis, cn } from "@/lib/utils";
import { TelegramUsername } from "./telegram-username";
import Link from 'next/link';
import { getExplorerAccountLink } from '@/lib/aptos';

export interface ProfileCardProps {
  address: Address;
  balance: number;
  totalTransactions: number;
  className?: string;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { address, balance, totalTransactions, className } = props;
  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="flex items-center">
        <h3 className="text-sm text-white">
          <TelegramUsername />
        </h3>
        <Avatar address={address} />
        <h3 className="text-lg font-semibold text-white">
          <Link href={getExplorerAccountLink(address)} className="underline" target="_blank">{addEllipsis(address)}</Link>
        </h3>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="flex justify-between text-white">
          <div className="flex flex-col">
            <span className="text-gray-500">Balance</span>
            <span>{balance.toFixed(5).toLocaleString()} APT</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Total Transactions</span>
            <span>{totalTransactions.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

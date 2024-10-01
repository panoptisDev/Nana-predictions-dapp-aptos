

import { MarketInfo } from "@/components/market-info";
import { Card } from "@/components/ui/card";
import { AvailableMarket } from "@/lib/get-available-markets";
import { getMarketType } from "@/lib/get-market-type";
import { initializeMarket } from "@/lib/initialize-market";
import { Address, MarketData } from "@/lib/types/market";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarketTitle } from "@/components/market-title";
import { TradingViewWidget } from "@/components/trading-view-widget";
import { MarketCardTimeline } from "@/components/market-card-timeline";
import { ResolveMarketButton } from '@/components/resolve-market-button';


export default async function Market({
    params,
}: {
    params: { address: string; };
}) {
    const marketType = await getMarketType(params.address as Address);

    const availableMarket: AvailableMarket = {
        address: params.address as Address,
        type: marketType,
    };

    const marketData: MarketData = await initializeMarket(availableMarket);

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
                className="mb-4"
                linkHref="/markets"
                linkTitle="Markets"
                pageName={marketData.name} />

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="grid items-center">
                    <MarketTitle
                        tradingPair={marketData.tradingPair}
                        resolveTime={marketData.endTime}
                        betCloseTime={marketData.startTime}
                        className="text-lg" />
                </Card>

                <div className={`justify-self-end w-full md:w-auto ${marketData.endPrice && 'hidden'}`}>
                    <ResolveMarketButton marketData={marketData} />
                </div>

            </div>

            <Card className="h-full my-4">
                <MarketCardTimeline
                    createTime={marketData.createdAt}
                    betCloseTime={marketData.startTime}
                    endTime={marketData.endTime} />
            </Card>

            <MarketInfo
                availableMarket={availableMarket}
                initialMarketData={marketData}
            >
                <Card className="h-full bg-[#161a25] backdrop-grayscale-none bg-opacity-100 backdrop-blur-none">
                    <TradingViewWidget marketType={marketType} />
                </Card>
            </MarketInfo>
        </div>
    );
}

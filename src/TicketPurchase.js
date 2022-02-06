import { IoMdWallet } from 'react-icons/io'
import Venue from "./venue.jpg";
import Countdown from 'react-countdown';

function TicketPurchase(props) {
    const eventId = props.match.params.event_id;

    const style = {
        button: "mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer",
        buttonIcon: "text-xl",
        buttonText: "ml-2 text-lg font-semibold",
        wrapper: "flex flex-col items-center container-lg text-ticket_purchase",
        container: "container p-6",
        topContent: "flex",
        nftImgContainer: "flex mr-4",
        detailsContainer: "flex-2 ml-4",
        likesCounter: "flex-1 flex items-center justify-end",
     }

     const detailStyle = {
        wrapper: 'flex',
        infoContainer: 'h-36 flex flex-col flex-1 justify-between mb-6',
        accent: 'text-ticket_purchase-accent',
        nftTitle: 'text-3xl font-extrabold',
        otherInfo: 'flex',
        ownedBy: 'text-ticket_purchase-owned_by mr-4',
     }

    const nftMockData = { name: 'Mock Name'}

    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
    };
    

    return (
        <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
            <div>
                <div>
                    <img src={Venue} />
                </div>
            </div>
            </div>
        <div className={style.detailsContainer}>
        <div className={detailStyle.wrapper}>
        <div className={detailStyle.infoContainer}>
          <div className={detailStyle.accent}>Concert Venue</div>
          <div className={detailStyle.nftTitle}>{nftMockData?.name}</div>
          <div className={detailStyle.otherInfo}>
            <div className={detailStyle.ownedBy}>
              Owned by <span className={style.accent}>Address</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col h-20 w-full items-center rounded-lg border border-stone-700 bg-stone-900 hover:bg-black px-12">
            <>
            Sale ends February 8, 2022 at 6:08pm EST 
            </>
            <Countdown
                date={Date.now() + 100000000}
                renderer={renderer}
            />
        </div>
        <div className="flex h-20 w-full items-center rounded-lg border border-stone-700 bg-stone-900 hover:bg-black px-12">
            <div className={style.button + " bg-cyan-700 hover:bg-cyan-500"}>
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
            </div>
        </div>
        </div>
        </div>
      </div>
    </div>
    );
}

export default TicketPurchase;
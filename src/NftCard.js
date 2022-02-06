import { useEffect, useState } from 'react';


function NftCard(props) {
  const [price, setPrice] = useState(0)
  const nftData = JSON.parse(props.nftData.metadata);
  const title = props.title;

  console.log(nftData)

  const style = {
  wrapper: "max-w-sm bg-nft_card flex-auto w-14 h-22 my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer",
  imgContainer: "h-2/3 w-full overflow-hidden flex justify-center items-center",
  nftImg: "w-full object-cover",
  details: "p-3",
  info: "flex justify-between text-nft_card-info drop-shadow-xl",
  infoLeft: "flex-0.6 flex-wrap",
  collectionName: "font-semibold text-sm text-nft_card-collection_name",
  assetName: "font-bold text-lg mt-2",
  infoRight: "flex-0.4 text-right",
  priceTag: "font-semibold text-sm text-nft_card-price_tag",
  priceValue: "flex items-center text-xl font-bold mt-2",
  maticLogo: "h-5 mr-2",
}

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <img src={nftData.image} alt={nftData.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftData.name}</div>
          </div>
          
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.maticLogo}
                />
                {price}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;

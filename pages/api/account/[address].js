import resolveLink from "../../../helpers/resolveLink"

export default async function handler(req, res) {
  const { address } = req.query

  try {
    const addressNftData = await fetch(
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=mumbai&format=decimal`,
      {
        method: "GET",
        headers: {
          accept: "applications/json",
          "X-API-Key": process.env.MORALIS_API_KEY,
        },
      }
    )
    const nftData = await addressNftData.json()

    const nftImages = nftData.result.map((e) => {
      const image = JSON.parse(e.metadata)?.image
      // If image does not exist or is less than a bit less than expected, it is classified as no image
      if (image == null || image.length < 40) return "no img"
      return resolveLink(image)
    })
    function imageFilterer(value) {
      return value != "no img"
    }
    const filteredNftImages = nftImages.filter(imageFilterer)

    res.status(200).json({ nftImages: filteredNftImages, nftData: nftData })
  } catch (error) {
    console.log(error)
  }
}
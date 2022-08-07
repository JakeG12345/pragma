const resolveLink = (url) => {
  const link = String(url)
  if (!link || !link.includes("ipfs://")) return link
  return link.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
}

export default resolveLink
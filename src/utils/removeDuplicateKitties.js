export default function removeDuplicateKitties (kitties) {
    return kitties.reduce(
        (kittyList, kitty) => {
            if (!kittyList.find((c) => c.name === kitty.name)) {
                return [...kittyList, kitty]
            } else {
                return kittyList
            }
        },
        []
    )
}

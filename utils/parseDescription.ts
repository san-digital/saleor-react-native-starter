const parseDescription = (description: string | undefined | null) => {
    if (!description) {
        return ""
    }
    try {
        const descriptionJson = JSON.parse(description)

        const blocks: { data: { text: string } }[] = descriptionJson.blocks

        if (!blocks) {
            return ""
        }

        return blocks.map(block => block.data.text).join("\n")
    } catch (e) {
        return ""
    }
}

export default parseDescription
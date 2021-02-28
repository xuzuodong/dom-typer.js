import marked from 'marked'

class Typer {
    constructor(str) {
        this.targetString = str ? str : ''
        this.outputString = ''
        this.speed = 50
        this.typing = false
        this.lexicalStructure = str ? marked.lexer(str) : {}
        this.pointer = [0, 0]
        this.slot = {}
    }

    set targetString(str) {
        this.outputString = ''
        this.typing = false
        this.lexicalStructure = marked.lexer(str)
        this.pointer = [0, 0]
    }

    /**
     * 打字机的效果输出一个字符串
     * @param tick 每次打字完成的回调函数，可拿到当前字符串
     * @param done 完成整个字符串的回调函数，可拿到最终字符串
     */
    type(tick, done) {
        const nodesLength = this.lexicalStructure[0].tokens.length // 节点数量
        const currentNode = this.lexicalStructure[0].tokens[this.pointer[0]] // 当前节点
        const currentNodeIndex = this.pointer[0] // 当前是第几个节点
        const currentTextLength = currentNode.text.length // 当前节点文本长度
        const currentTextIndex = this.pointer[1] // 当前是文本的第几个字符
        this.typing = true

        if (currentNode.type == 'text') {
            this.outputString += currentNode.text[currentTextIndex]
        } else if (currentNode.type == 'strong') {
            this.outputString += `<strong>${currentNode.text[currentTextIndex]}</strong>`
        }

        // 如果不在最后一个节点，也不是最后一个字符，则 pointer[1]++
        // 如果不在最后一个节点，是最后一个字符，则 pointer[0]++; pointer[1] = 0
        // 如果在最后一个节点，不是最后一个字符，则 pointer[1]++
        // 如果在最后一个节点，是最后一个字符，则 pointer[0]++
        // 因此：
        // 只要不是最后一个字符，那就只需要执行 pointer[1]++；
        // 如果是最后一个字符，则判断是不是最后一个节点里的最后一个字符。
        if (currentTextIndex + 1 != currentTextLength) {
            this.pointer[1]++
        }

        // 不是最后一个节点中的最后一个字符，则将 pointer 移动到下一个节点的 text 头部
        else if (currentTextIndex + 1 == currentTextLength && currentNodeIndex + 1 != nodesLength) {
            this.pointer[0]++
            this.pointer[1] = 0
        }

        // 剩下的情况就是最后一个节点的最后一个字符
        else {
            this.pointer[0]++
            this.pointer[1]++
        }

        if (tick) tick(this.outputString)

        setTimeout(() => {
            if (!this.typing) return

            // 判断本次打印是否完成了全部任务
            if (this.pointer[0] != nodesLength && this.pointer[1] != currentTextLength) {
                this.type(tick, done)
            } else {
                this.typing = false
                if (done) done(this.outputString)
            }
        }, this.speed)
    }
}

export default Typer

/**
 * @authors 周登攀
 * @date    2017-08-08 18:53:56
 * @version 1.0
 */

const tools = {
  msg: (obj) => {
    let { text, position, time } = obj
    let Html = '<span class="msg">' + text + '</span>'
    let body = document.getElementsByTagName('body')[0]
    var node = document.createElement('div')
    node.id = 'MsgBox'
    addClass(node, 'Msg_' + position)
    node.innerHTML = Html
    body.appendChild(node)
    if (!time) {
      return false
    }
    setTimeout(() => {
      let id = document.getElementById('MsgBox')
      addClass(id, 'hide')
      let parent = id.parentElement
      parent.removeChild(id)
    }, time)
  },
  loading: (type) => {
    if (type === 'open') {
      let loading = '<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
      let body = document.getElementsByTagName('body')[0]
      var node = document.createElement('div')
      node.id = 'cover'
      node.innerHTML = loading
      body.appendChild(node)
    } else if (type === 'close') {
      let id = document.getElementById('cover')
      let parent = id.parentElement
      parent.removeChild(id)
    }
  }
}

const hasClass = (element, csName) => {
  return element.className.match(RegExp('(\\s|^)' + csName + '(\\s|$)'))
}

const addClass = (element, csName) => {
  if (!hasClass(element, csName)) {
    element.className += ' ' + csName
  }
}

export default tools

/**
 * @param {Element} dom
 * @param {tagName} string
 * @returns {Element}
 */
const getDomFromParentElementsByTagName = (dom, tagName) => {
  if (dom.tagName === 'LI') {
    return dom
  } else {
    return getDomFromParentElementsByTagName(dom.parentElement, tagName)
  }
}

/**
 * @param {Event} event
 */
const clearEditMode = (event) => {
  const target = event.target
  if (target instanceof Element && target.tagName === 'INPUT') {
    const li = getDomFromParentElementsByTagName(target, 'LI')
    li.classList.remove('editing')
  }
}

window.onload = () => {
  /**
   * @type {HTMLUListElement}
   */
  const todoList = document.getElementsByClassName('todo-list')[0]
  todoList.addEventListener('dblclick', (event) => {
    const target = event.target
    if (target instanceof Element && target.tagName === 'LABEL') {
      const li = getDomFromParentElementsByTagName(target, 'LI')
      const isEditing = [...li.classList.entries()].includes('editing')
      if (isEditing) {
        li.classList.remove('editing')
      } else {
        li.classList.add('editing')
      }
    }
  })
}

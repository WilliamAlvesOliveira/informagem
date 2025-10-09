'use strict'

//função dos filtro
export function filterPosts(posts) {
  const activeTags = Array.from(
    document.querySelectorAll('input[type="checkbox"][name="tag"]:checked')
  ).map(el => el.value.toLowerCase())

  const sortType = document.querySelector('input[name="sort"]:checked')?.value || 'mais recente'

  let filtered = []
  if (activeTags.length > 0) {
    filtered = posts.filter(post =>
      post.tags.some(tag => activeTags.includes(tag.toLowerCase()))
    )
  }

  // Ordenar conforme opção escolhida
  filtered.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    switch (sortType) {
      case 'menos recentes':
        return dateA - dateB
      case 'mais recentes':
        return dateB - dateA
      case 'mais relevantes':
        return (b.meta?.views || 0) - (a.meta?.views || 0)
      default:
        return 0
    }
  })

  return filtered
}

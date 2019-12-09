const addBook = document.querySelector('.add-book')
const wrapper = document.querySelector('.wrapper')
const modal = document.querySelector('.modal')
const submitBook = document.querySelector('.submit')

let index = 0

class Book {
 constructor(title, author, page, year, cover, read) {
  this.title = title
  this.author = author
  this. page = page
  this.year = year
  this.cover = cover
  this.read = read
  this.index = index
 }

 addNewBook() {
  const divEl = document.createElement('div')
  divEl.className = 'book'
  divEl.setAttribute('data-book', `${index}`)
  divEl.style.backgroundImage = `url(${this.cover})`
  
  
  const spanContainer = document.createElement('div')
  spanContainer.className = 'span-container'

  const readButton = document.createElement('span')
  readButton.className = 'read'
  readButton.setAttribute('data-book', `${index}`)
  readButton.innerHTML = `read <i class="fa fa-check">`

  if (this.read === 'on') {
   readButton.style.color = '#0f0'
  }

  const deleteButton = document.createElement('span')
  deleteButton.className = 'delete'
  deleteButton.setAttribute('data-book', `${index}`)
  deleteButton.innerHTML = `delete <i class="fa fa-trash"></i>`

  const detailsContainer = document.createElement('div')
  detailsContainer.className = 'details-container'

  const title = document.createElement('h3')
  title.innerHTML = this.title
  const author = document.createElement('h5')
  author.innerHTML = this.author
  const pageAndYear = document.createElement('h6')
  pageAndYear.innerHTML = `${this.page} pages • ${this.year}`

  spanContainer.appendChild(readButton)
  spanContainer.appendChild(deleteButton)

  detailsContainer.appendChild(title)
  detailsContainer.appendChild(author)
  detailsContainer.appendChild(pageAndYear)

  divEl.appendChild(spanContainer)
  divEl.appendChild(detailsContainer)
  wrapper.appendChild(divEl)

  deleteButton.addEventListener('click', (e) => {
   this.deleteBook(e.currentTarget)
  })
  
  readButton.addEventListener('click', (e) => {
   this.readBook(e.currentTarget)
  })
  
  index++
 }
 
 deleteBook(book) {
  const bookToDel = book.dataset.book
  wrapper.removeChild(book.offsetParent)
  const bookCard = bookLibrary.find(book => book.index == bookToDel)
  const bookIndex = bookLibrary.indexOf(bookCard)
  bookLibrary.splice(bookIndex, 1)
  localStorage.setItem('Book', JSON.stringify(bookLibrary))
 }

 readBook(book) {
  if (book.style.color === 'rgb(0, 255, 0)') {
   book.style.color = '#cc9543'
   bookLibrary[book.dataset.book].read = null
   localStorage.setItem('Book', JSON.stringify(bookLibrary))
   return
  } else {
   book.style.color = '#0f0'
   bookLibrary[book.dataset.book].read = 'on'
   localStorage.setItem('Book', JSON.stringify(bookLibrary))
  }

 } 
}

const newBook = new Book(
 'The 7 Habbits of Highly Effective People',
 'Stephen R. Covey',
 '381',
 '1989',
 './images/7-habbits.jpg',
 'on'
)
 
const bookLibrary = JSON.parse(localStorage.getItem('Book')) || [newBook]

for (let i = 0; i < bookLibrary.length; i++) {
 const newBook = new Book(
  bookLibrary[i].title,
  bookLibrary[i].author,
  bookLibrary[i].page,
  bookLibrary[i].year,
  bookLibrary[i].cover,
  bookLibrary[i].read
 )   
 newBook.addNewBook()
 bookLibrary[i].index = newBook.index
 localStorage.setItem('Book', JSON.stringify(bookLibrary))
}
 
addBook.addEventListener('click', () => {
 modal.style.display = 'block'
})

submitBook.addEventListener('submit', (e) => {
 e.preventDefault()
 const formData = new FormData(e.target)
 const newBook = new Book(
  formData.get('title'),
  formData.get('author'),
  formData.get('page'),
  formData.get('year'),
  formData.get('image'),
  formData.get('read')
 )
 bookLibrary.push(newBook)
 localStorage.setItem('Book', JSON.stringify(bookLibrary))
 newBook.addNewBook()
 modal.style.display = 'none'
})

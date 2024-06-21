const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
}

const mostBlogs = (blogs) => {
  let count = {}
  blogs.forEach((blog) => {
    if (!count[blog.author]) {
      count[blog.author] = {
        author: blog.author,
        blogs: 1,
      }
    } else {
      count[blog.author].blogs++
    }
  })
  let countArr = Object.values(count)
  let sorted = _.sortBy(countArr, 'blogs')

  return sorted[sorted.length - 1]
}

const mostLikes = (blogs) => {
  let sum = {}

  blogs.forEach((blog) => {
    if (!sum[blog.author]) {
      sum[blog.author] = {
        author: blog.author,
        likes: blog.likes,
      }
    } else {
      sum[blog.author].likes += blog.likes
    }
  })
  let sumArr = Object.values(sum)
  let sorted = _.sortBy(sumArr, 'likes')

  return sorted[sorted.length - 1]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

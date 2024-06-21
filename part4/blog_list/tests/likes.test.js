const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const oneBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
]

const allBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const twoBlogs = [
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
]

describe('total likes', () => {
  test('when list has one blog, return the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlogList)
    assert.strictEqual(result, 7)
  })

  test('sum of all blogs', () => {
    const result = listHelper.totalLikes(allBlogs)
    assert.strictEqual(result, 36)
  })

  test('sum of two blogs', () => {
    const result = listHelper.totalLikes(twoBlogs)
    assert.strictEqual(result, 22)
  })
})

describe('favorite blog', () => {
  test('favorite out of two', () => {
    const result = listHelper.favoriteBlog(twoBlogs)
    assert.deepStrictEqual(result, twoBlogs[0])
  })

  test('favorite out of one should return the same blog', () => {
    const result = listHelper.favoriteBlog(oneBlogList)
    assert.deepStrictEqual(result, oneBlogList[0])
  })

  test('favorite of all blogs should return highest likes', () => {
    const result = listHelper.favoriteBlog(allBlogs)
    assert.deepStrictEqual(result, allBlogs[2])
  })
})

describe('most blogs written', () => {
  const most = { author: 'Robert C. Martin', blogs: 3 }
  test('most of all', () => {
    const result = listHelper.mostBlogs(allBlogs)
    assert.deepStrictEqual(result, most)
  })
})

describe('most likes from blogs', () => {
  const mostLikes = { author: 'Edsger W. Dijkstra', likes: 17 }

  test('most likes of all blogs', () => {
    const result = listHelper.mostLikes(allBlogs)
    assert.deepStrictEqual(result, mostLikes)
  })
})

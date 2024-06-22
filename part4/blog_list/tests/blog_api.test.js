const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
describe('initial blogs in db', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog returns an id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.map(blog => {
      assert.ok(blog.id)
    })
  })
})
describe('adding blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Notfatdan',
      url: 'http://notfatdaniel.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('New Blog'))
  })
})

describe('bad input', () => {
  test('blog without likes defaults likes to 0', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Notfatdan',
      url: 'http://notfatdaniel.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.find(b => b.title === 'New Blog')
    assert.strictEqual(contents.likes, 0)
  })

  test('blog without title returns 400 bad request', async () => {
    const newBlog = {
      author: 'Notfatdan',
      url: 'http://notfatdaniel.com',
      likes: 99
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('blog without URL returns 400 bad request', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Notfatdan',
      likes: 99
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deleting a  blog', () => {
  test('deleting a blog returns 204 success', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('updating values of a blog returns 201', async () => {
    const newBlog = {
      title: 'hello sir new update here',
      author: 'notfatdan',
      url: 'www.hellogoodbye.io',
      likes: 69
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    assert.strictEqual(contents.title, newBlog.title)
  })
})

after(async () => {
  mongoose.connection.close()
})

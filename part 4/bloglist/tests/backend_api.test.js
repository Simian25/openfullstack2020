const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog_helper = require('../utils/blog_helper')
const api = supertest(app)
describe('backend testing',()=>{
const auth= 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcnRqZTk4IiwiaWQiOiI1ZWM0ZTdiNzIyNmI0NDM3YjAyNTFlODIiLCJpYXQiOjE1ODk5NjI3MDN9.SCSV3x5Wim8gv9LjqZRCYHbAP791X61-Xcjy4oLNqi8'

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
test("unique identifier 'id' exists",async () => {
      const res = await api.get('/api/blogs');
      res.body.forEach((entry) => {
        expect(entry.id).toBeDefined();
      });
    }
  );
test('blogs are added to list',async()=>{
    const initialRes = await blog_helper.blogsInDb()
    const blogPost = {
        title: 'Studying in Corona',
        author: 'Joe Mama',
        url:
          'http://youtube.com',
        likes: 6,
      };
    await api.post('/api/blogs')
    .set('Authorization',auth)
    .send(blogPost)
    .expect(201);
    const finalRes = await blog_helper.blogsInDb();
    expect(finalRes.length).toBe(initialRes.length + 1)

})
test(
    'if likes is missing from the request set to 0',
    async () => {
      const newBlog = {
        title: 'math for dummies',
        author: 'mr dumb',
        url:
          'http://fordummies.com',
      };
      const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization',auth)
        .send(newBlog)
        .expect(201)
      expect(savedBlog.body.likes).toBe(0);
    }
  );
  test(
    'if title and url are missing from blog respond with 400',
    async () => {
      const newBlog = {
        author: 'Angela whu',
        likes: 6,
      };

      await api
        .post('/api/blogs')
        .set('Authorization',auth)
        .send(newBlog)
        .expect(400);
    }
  );
});
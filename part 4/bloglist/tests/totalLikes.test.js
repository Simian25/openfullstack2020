const totalLikes = require('../utils/list_helper').totalLikes

describe('totalLikes',()=> {
    test('of empty list is zero',()=>{
        const blogs=[];
        const result = totalLikes(blogs)
        expect(result).toBe(0)
    })
    test('of one blog equals blog',()=>{
        const blogs=[{
            name:'test',
            author:'test',
            likes:5
        }]
        const result = totalLikes(blogs)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right',()=>{
        const blogs=[{
            name:'test',
            author:'test',
            likes:5
        },
        {name:'karel',
        author:'karal',
        likes:10}   
    ]
        const result = totalLikes(blogs)
        expect(result).toBe(15)
    })


})
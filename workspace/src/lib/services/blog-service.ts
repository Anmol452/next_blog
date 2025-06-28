'use server';

import clientPromise from '@/lib/mongodb';
import { blogPosts as mockBlogPosts } from '@/lib/mock-data';
import type { Collection, Db, WithId } from 'mongodb';

// Infer the types from mock data to ensure consistency.
type MockBlogPost = typeof mockBlogPosts[0];
type BlogPostDocument = Omit<MockBlogPost, 'id'>;

async function getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db('blognest');
}

async function getBlogCollection(): Promise<Collection<BlogPostDocument>> {
    const db = await getDb();
    const collection = db.collection<BlogPostDocument>('blogposts');
    
    const count = await collection.countDocuments();
    if (count === 0) {
        console.log('Seeding `blogposts` collection from mock data...');
        // Omit the 'id' field from mock data so MongoDB can generate its own '_id'
        const postsToInsert = mockBlogPosts.map(({ id, ...rest }) => rest);
        await collection.insertMany(postsToInsert);
        console.log('Seeding complete.');
    }

    return collection;
}

/**
 * Maps a MongoDB document to the BlogPost type used in the application.
 * The numeric 'id' from the original mock data is replaced by the MongoDB '_id' as a string.
 * @param doc The document fetched from MongoDB.
 * @returns A BlogPost object compatible with the application's components.
 */
function toAppBlogPost(doc: WithId<BlogPostDocument>): MockBlogPost {
    const { _id, ...rest } = doc;

    const postWithId = {
        id: _id.toString(), // Convert ObjectId to string for the ID
        ...rest,
    };
    // The rest of the app expects the mock data structure. 
    // We cast here to maintain compatibility. The most important thing is that
    // the 'id' is a unique string that can be used as a React key.
    return postWithId as MockBlogPost;
}

/**
 * Fetches all blog posts from the database, sorted by date descending.
 * @returns A promise that resolves to an array of blog posts.
 */
export async function getAllBlogPosts(): Promise<MockBlogPost[]> {
    const collection = await getBlogCollection();
    const posts = await collection.find({}).sort({ date: -1 }).toArray();
    return posts.map(toAppBlogPost);
}

/**
 * Fetches a single blog post from the database by its slug.
 * @param slug The slug of the blog post to fetch.
 * @returns A promise that resolves to the blog post, or null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<MockBlogPost | null> {
    const collection = await getBlogCollection();
    const post = await collection.findOne({ slug });
    
    if (!post) {
        return null;
    }

    return toAppBlogPost(post);
}

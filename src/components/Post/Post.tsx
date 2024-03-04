import { DataStore } from 'aws-amplify/datastore';
import React, { useState, useEffect, useCallback } from 'react';
import { Post, PostStatus } from "../../models";
import debounce from 'lodash.debounce'; // Ensure lodash.debounce is installed

const PostComponent = () => {
    const [text, setText] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);

    const saveText = useCallback(
      debounce(async (text: string) => {
        console.log('Saving data:', text);
        await upsertPost(text);
      }, 500), // 500ms delay
      [],
    );

    async function upsertPost(inputText: string) {
        const title = inputText; // Assuming this generates a unique title
        // const existingPosts = await DataStore.query(Post, c => c.title.eq(title));
        const existingPosts = await DataStore.query(Post);
        // debugger;
        if (existingPosts.length > 0) {
            // Post exists, update it
            const post = existingPosts[0];
            await DataStore.save(
                Post.copyOf(post, updated => {
                    updated.title = title;
                })
            );
        } else {
            // Post does not exist, create a new one
            await DataStore.save(
                new Post({
                    title: title,
                    rating: Math.floor(Math.random() * (8 - 1) + 1),
                    status: PostStatus.ACTIVE,
                })
            );
        }
        await fetchPosts(); // Refresh the list of posts
    }

    async function fetchPosts() {
      const posts = await DataStore.query(Post);
        // debugger;
          if (posts.length > 0) {
              // Assuming you want to set the textarea value to the content of the first post
              // Adjust this logic based on how you decide which post's content to display
              setText(posts[0].title);
          }
    }

    useEffect(() => {
      fetchPosts();
    }, []); // Empty dependency array means this effect runs once on mount


    useEffect(() => {
      if (text) {
        saveText(text);
      }
    }, [text, saveText]);


    useEffect(() => {
        const subscription = DataStore.observe(Post).subscribe((msg) => {
            console.log(msg.model, msg.opType, msg.element);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Observations (Amplify) :</label>
            <div className="mt-2">
                <textarea id="observations"
                          name="observations"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows={8}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </textarea>
            </div>
        </div>
    );
};

export default PostComponent;

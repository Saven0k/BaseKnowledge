import { useState, useEffect } from "react";
import "./list.css";
import { filterPost } from "../../services/filterFunc";
import SearchComponent from "../SearchComponent/SearchComponent";
import NothingNot from '../PostList/NothingNot/NothingNot'
import PostsListOkView from "../PostList/PostsListOkView/PostsListOkView";
import { getPostFor, getPostForStudent, getPublicPostOfRole } from "../../services/ApiToServer/posts";
import { useMyContext } from "../../services/MyProvider/MyProvider";

/**
 * React component, which creates a platform for working with student posts.
 * @returns post board
 */
const List = ({ ready, type }) => {
	// State for posts list
	const [postsList, setPostsLists] = useState([]);

	const { contextState, updateContextState } = useMyContext();

	// State for filtered posts list.
	const [filteredPostsList, setFilteredPostsLists] = useState([]);

	// State for search item.
	const [searchItem, setSearchItem] = useState("");

	const prepareData = async () => {
		if (type === 'city') {
			const posts = await getPostFor(contextState.city)
			setPostsLists(posts)
			setFilteredPostsLists(posts)
			return ''
		}
		if (type === 'student') {
			const posts = await getPostForStudent(localStorage.getItem('group'))
			setPostsLists(posts);
			setFilteredPostsLists(posts);
			return ''
		}
		if (type === 'teacher') {
			const posts = await getPublicPostOfRole("teacher");
			setPostsLists(posts);
			setFilteredPostsLists(posts);
			return ''
		}
		if (type === 'all') {
			const posts = await getPublicPostOfRole("all");
			setPostsLists(posts);
			setFilteredPostsLists(posts);
			return ''
		}
		if (localStorage.getItem('role') == 'admin') {
			if (type === 'student') {
				const posts = await getPostFor("student");
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (type === 'techer') {
				const posts = await getPostFor("teacher");
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
		}
	}

	useEffect(() => {
		prepareData()
	}, [contextState.city])

	// After the page loads, return prepareData()
	useEffect(() => {
		if (ready) {
			prepareData()
		}
	}, [ready]);

	// Function to record the value, define and modify the filtered list.
	function handleSearch(value) {
		setSearchItem(value);
		setFilteredPostsLists(filterPost(value, postsList));
	}

	return (
		<div className="account">
			<SearchComponent searchItem={searchItem} handleSearch={handleSearch} />
			<div className="posts center">
				{filteredPostsList != 0 ? <PostsListOkView filteredPostsList={filteredPostsList} setFilteredPostsLists={setFilteredPostsLists} /> : <NothingNot />}
			</div>
		</div>
	);
};
export default List;
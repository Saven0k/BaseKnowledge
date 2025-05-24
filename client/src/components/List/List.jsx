import { useState, useEffect } from "react";
import "./list.css";
import { filterPost } from "../../services/filterFunc";
import SearchComponent from "../SearchComponent/SearchComponent";
import NothingNot from '../PostList/NothingNot/NothingNot'
import PostsListOkView from "../PostList/PostsListOkView/PostsListOkView";
import { getPostsByContextByRoleByStatus } from "../../services/ApiToServer/posts";
import { useMyContext } from "../../services/MyProvider/MyProvider";

/**
 * React component, which creates a platform for working with student posts.
 * @returns post board
 */
const List = ({ ready, type, data }) => {
	// State for posts list
	const [postsList, setPostsLists] = useState([]);

	const { contextState, updateContextState } = useMyContext();

	// State for filtered posts list.
	const [filteredPostsList, setFilteredPostsLists] = useState([]);

	// State for search item.
	const [searchItem, setSearchItem] = useState("");
	const prepareData = async () => {
		if (contextState.role === 'admin') {
			if (data.role === 'student') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (data.role === 'teacher') {
				const posts = await getPostsByContextByRoleByStatus(data.role, null, data.status);
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (data.role === 'city') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (data.role === 'form') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (data.role === 'all') {
				const posts = await getPostsByContextByRoleByStatus(data.role, null, data.status);
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
		}
		else {
			if (type === 'city') {
				const posts = await getPostsByContextByRoleByStatus('city', contextState.city, "1")
				setPostsLists(posts)
				setFilteredPostsLists(posts)
				return ''
			}
			if (type === 'student') {
				const posts = await getPostsByContextByRoleByStatus('student', localStorage.getItem('group'), "1")
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (type === 'teacher') {
				const posts = await getPostsByContextByRoleByStatus("teacher", "null", "1");
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
			if (type === 'all') {
				const posts = await getPostsByContextByRoleByStatus("all", "null", "1");
				setPostsLists(posts);
				setFilteredPostsLists(posts);
				return ''
			}
		}
	}

	// useEffect(() => {
	// 	prepareData()
	// }, [contextState.city])

	// After the page loads, return prepareData()
	useEffect(() => {
		prepareData()
	}, [data]);

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
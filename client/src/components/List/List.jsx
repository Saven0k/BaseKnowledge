import "./list.css";

import { useState, useEffect, useCallback } from "react";

import { filterPost } from "../../services/filterFunc";
import SearchComponent from "../SearchComponent/SearchComponent";
import NothingNot from '../PostList/NothingNot/NothingNot'
import PostsListOkView from "../PostList/PostsListOkView/PostsListOkView";
import { getPostsByContextByRoleByStatus } from "../../services/ApiToServer/posts";
import { useMyContext } from "../../services/MyProvider/MyProvider";


const List = ({ ready, type, data }) => {

	const [postsList, setPostsList] = useState([]);
	const [filteredPostsList, setFilteredPostsList] = useState([]);
	const [searchItem, setSearchItem] = useState("");

	const { contextState } = useMyContext();

	const prepareData = useCallback(async () => {
		if (!ready) return;
		if (contextState.role === 'admin') {
			if (data.role === 'student') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (data.role === 'teacher') {
				const posts = await getPostsByContextByRoleByStatus(data.role, null, data.status);
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (data.role === 'city') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (data.role === 'form') {
				const posts = await getPostsByContextByRoleByStatus(data.role, data.role_context, data.status);
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (data.role === 'all') {
				const posts = await getPostsByContextByRoleByStatus(data.role, null, data.status);
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
		}
		else {
			if (type === 'city') {
				const posts = await getPostsByContextByRoleByStatus('city', contextState.city.split(), "1")
				setPostsList(posts)
				setFilteredPostsList(posts)
				return ''
			}
			if (type === 'student') {
				const posts = await getPostsByContextByRoleByStatus('student', localStorage.getItem('group').split(' '), "1")
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (type === 'teacher') {
				const posts = await getPostsByContextByRoleByStatus("teacher", "null", "1");
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (type === 'all') {
				const posts = await getPostsByContextByRoleByStatus("all", "null", "1");
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
			if (type === 'form') {
				const posts = await getPostsByContextByRoleByStatus("form", localStorage.getItem('form'), "1");
				setPostsList(posts);
				setFilteredPostsList(posts);
				return ''
			}
		}
	})


	useEffect(() => {
		prepareData()
	}, [data]);

	function handleSearch(value) {
		setSearchItem(value);
		setFilteredPostsList(filterPost(value, postsList));
	}

	return (
		<div className="account">
			<SearchComponent searchItem={searchItem} handleSearch={handleSearch}  />
			<div className="posts center">
				{filteredPostsList != 0 ? <PostsListOkView filteredPostsList={filteredPostsList} setFilteredPostsLists={setFilteredPostsList} /> : <NothingNot />}
			</div>
		</div>
	);
};
export default List;
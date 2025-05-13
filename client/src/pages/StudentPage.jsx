import { useEffect } from "react";
import StudentBranch from "../components/StudentBranch/StudentBranch";
import { addVisitor } from "../services/ApiToServer/visitors";


/**
 * Main (index) page. 
 * @returns Header,PostList components.
 */
const StudentPage = () => {
	async function setVisit() {	
		addVisitor()
	}

	useEffect(() => {
		setVisit()
	}, [])

	
	return (
		<StudentBranch />
	);
};

export default StudentPage;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api/posts": "http://localhost:5000",
			"/api/posts/add": "http://localhost:5000",
			"/api/posts/update": "http://localhost:5000",
			"/api/posts/visible": "http://localhost:5000",
			"/api/posts/delete": "http://localhost:5000",
			'api/posts/status/context': "http://localhost:5000",
			'api/posts/update/status': "http://localhost:5000",
			'api/posts/image': "http://localhost:5000",
			'/api/posts/public/role': "http://localhost:5000",

			"/api/college/groups": "http://localhost:5000",
			"/api/college/groups/new": "http://localhost:5000",
			"/api/college/groups/update": "http://localhost:5000",
			"/api/college/groups/delete/:id": "http://localhost:5000",

			"/api/university/groups": "http://localhost:5000",
			"/api/university/groups/new": "http://localhost:5000",
			"/api/university/groups/update": "http://localhost:5000",
			"/api/university/groups/delete/:id": "http://localhost:5000",

			"/api/classes": "http://localhost:5000",
			"/api/classes/new": "http://localhost:5000",
			"/api/classes/update": "http://localhost:5000",
			"/api/classes/delete/:id": "http://localhost:5000",


			"/api/users": "http://localhost:5000",
			"/api/users/add": "http://localhost:5000",
			"/api/users/update": "http://localhost:5000",
			"/api/users/delete": "http://localhost:5000",
			"/api/users/find": "http://localhost:5000",

			'/api/teacher/visit/all': "http://localhost:5000",
			'/api/teacher/visit/update': "http://localhost:5000",
			'/api/teacher/visitors': "http://localhost:5000",

			'/api/visitors': "http://localhost:5000",
			'/api/visitors/add': "http://localhost:5000",
			'/api/visitors/all': "http://localhost:5000",

			'/api/cities': "http://localhost:5000",
			'/api/cities/delete/:id': "http://localhost:5000",
			'/api/cities/new': "http://localhost:5000",
			'/api/cities/update': "http://localhost:5000",

			'/api/roles/update': "http://localhost:5000",
			'/api/roles/delete/:id': "http://localhost:5000",
			'/api/roles/new': "http://localhost:5000",
			'/api/roles': "http://localhost:5000",
			
			
			
			'/api/specialities': "http://localhost:5000",
			'/api/specialities/new': "http://localhost:5000",
			'/api/specialities/delete/:id': "http://localhost:5000",
			'/api/specialities/update': "http://localhost:5000",
		},
	},
});

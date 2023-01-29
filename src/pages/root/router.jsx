import { React } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { AppLayout } from "../../components";
import { Projects, Home, NewProject, About, Contact, EditProject } from "./..";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/new-project" element={<NewProject />} />
      <Route path="project/:id" element={<EditProject />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

export default router;

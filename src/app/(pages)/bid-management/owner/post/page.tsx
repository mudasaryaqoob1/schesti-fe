'use client'
import { withAuth } from "@/app/hoc/withAuth"

function CreatePost() {
    return <div>
        Create Post
    </div>
}

export default withAuth(CreatePost)
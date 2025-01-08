import { useParams } from "react-router";


const Profile = () => {
    const { id } = useParams();

    return (
        <div>{ id }</div>
    )
} 

export default Profile;
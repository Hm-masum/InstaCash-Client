import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
    const {user}=useAuth() ;
    return (
        <div>
            <h2>{user.name}</h2>
        </div>
    );
};

export default MyProfile;
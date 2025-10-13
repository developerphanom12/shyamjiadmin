import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useBoardProfiles from '../../../hooks/invester/investerInfo/useBoardProfiles';

const BoardProfiles = () => {
    const [showAddModel, setShowAddModel] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const { fetchBoardProfiles, loading, boardProfiles, addBoardProfile, fetchBoardProfileById, boardProfileDetails, setBoardProfileDetails, updateBoardProfile, deleteBoardProfile, } = useBoardProfiles();
    // const [boardProfiles, setBoardProfiles] = useState([
    //     {
    //         id: 1,
    //         name: "Mr. Arvind Mehta",
    //         designation: "Chairman",
    //         image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
    //         details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    //     },
    //     {
    //         id: 2,
    //         name: "Mr. Sanjay Chaurey",
    //         designation: "Managing Director",
    //         image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
    //         details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    //     },
    //     {
    //         id: 3,
    //         name: "Mrs. Priya Sharma",
    //         designation: "Independent Director",
    //         image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
    //         details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    //     }
    // ]);


    useEffect(() => {
        fetchBoardProfiles()
    }, [])

    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        details: Yup.string().required('Profile details are required'),
        image: Yup.mixed().required('Profile image is required')
    });

    const initialValues = {
        name: "",
        details: "",
        image: null
    };

    const initialValuesUpdate = {
        name: boardProfileDetails.name || "",
        details: boardProfileDetails.details || "",
        image: boardProfileDetails.image_url || null,
    };

    const handleCloseModal = () => {
        setShowAddModel(false);
        setShowEditModel(false);
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("details", values.details);
        formData.append("image", values.image);
        addBoardProfile(formData)
        setShowAddModel(false);
    };
    
    const handleSubmitUpdate = (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("details", values.details);
        if (values.image && values.image instanceof File) {
            formData.append("image", values.image);
        }
        updateBoardProfile(boardProfileDetails.id , formData )
        setShowEditModel(false);
    };

    return (
        <>
            {/* Admin Controls */}

            <div className="flex justify-between items-center ">
                <h2 className=" ">
                    Board of Directors Profiles
                </h2>
                <div className="flex justify-end my-3">
                    <h4 onClick={() => setShowAddModel(true)} className="px-4 py-1 bg-[#FFAD00] rounded-sm  cursor-pointer">Add Profile</h4>
                </div>
            </div>

            {/* Table Layout */}
            <div className="bg-white overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-[#F7BF57]">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black">Profile Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black border-x border-gray-300">Name</th>
                            {/* <th className="px-6 py-3 text-left text-sm font-semibold text-black">Designation</th> */}
                            <th className="px-6 py-3 text-left text-sm font-semibold text-black border-x border-gray-300">Profile Details</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardProfiles?.map((profile, index) => (
                            <tr
                                key={profile.id}
                                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={profile.image_url}
                                        alt="image"
                                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-x border-gray-300">
                                    {profile.name}
                                </td>
                                {/* <td className="px-6 py-4 text-sm text-gray-800">
                  {profile.designation}
                </td> */}
                                <td className="px-6 py-4 text-sm text-gray-800 border-x border-gray-300">
                                    <div className="max-w-md">
                                        {profile.details}
                                    </div>
                                </td>
                                <td className="p-2 border border-gray-300">
                                    <div className="px-6  flex justify-center">
                                        <button className="hover:text-blue-600">
                                            <FaEdit onClick={() => {
                                                setBoardProfileDetails({})
                                                fetchBoardProfileById(profile.id)
                                                setShowEditModel(true)
                                            }} />
                                        </button>
                                        <button className="hover:text-red-600">
                                            <MdDelete onClick={() => deleteBoardProfile(profile.id)} />
                                        </button>
                                    </div>
                                </td>
                                {/* <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(profile)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      title="Edit Profile"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete Profile"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Profile Modal */}
            {showAddModel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white w-[90%] max-h-[90vh] max-w-4xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 pb-3 border-b">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingProfile ? 'Edit Profile' : 'Add New Profile'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <FiX size={22} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Form */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="space-y-6">
                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                                    {/* Name */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Full Name *</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name"
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>


                                    {/* Profile Details */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Profile Details *</label>
                                        <Field
                                            as="textarea"
                                            name="details"
                                            placeholder="Enter profile description and details"
                                            rows="4"
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                        <ErrorMessage
                                            name="details"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Profile Image *
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {values.image && (
                                                <img
                                                    src={typeof values.image === 'string' ? values.image : URL.createObjectURL(values.image)}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("image", file);
                                                }}
                                                className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="image"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-[#FFAD00] hover:bg-[#E69A00] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Add Profile
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
            {/* Edit Profile Modal */}
            {showEditModel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white w-[90%] max-h-[90vh] max-w-4xl rounded-xl shadow-lg p-6 overflow-y-auto relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 pb-3 border-b">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Edit Profile
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <FiX size={22} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Form */}
                        <Formik
                            initialValues={initialValuesUpdate}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmitUpdate}
                            enableReinitialize
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Full Name *</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name"
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>


                                    {/* Profile Details */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Profile Details *</label>
                                        <Field
                                            as="textarea"
                                            name="details"
                                            placeholder="Enter profile description and details"
                                            rows="4"
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        />
                                        <ErrorMessage
                                            name="details"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Profile Image *
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {values.image && (
                                                <img
                                                    src={typeof values.image === 'string' ? values.image : URL.createObjectURL(values.image)}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("image", file);
                                                }}
                                                className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="image"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-[#FFAD00] hover:bg-[#E69A00] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default BoardProfiles;
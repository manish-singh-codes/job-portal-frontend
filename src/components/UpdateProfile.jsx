'use client'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from './ui/dialog.jsx'
import {Label} from './ui/label.jsx'
import {Input} from './ui/input.jsx'
import {Button} from './ui/button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { setLoading } from '../redux/authSlice.js'
import PropTypes from 'prop-types';


const UpdateProfile = ({open,setOpen}) => {
    const {loading} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const handleChange = (e) =>{
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        
    }

    return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[550px] w-full'>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit} >
                    <div className='grid gap-4 py-4'>
                        <div className=' grid grid-cols-4 items-center gap-4 justify-items-start'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Name</Label>
                            <Input onChange={handleChange} type="text" id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4 justify-items-start'>
                            <Label htmlFor="email" className='col-span-1 text-right'>Email</Label>
                            <Input type="text" id='email' name='email' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4 justify-items-start'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Phone Number</Label>
                            <Input type="text" id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4 justify-items-start'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Change Resume</Label>
                            <Input type="file" accept='application/pdf' id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                    </div>
                   { loading? <Button className="w-full"> <Loader2 className='animate-spin' /> Loading...</Button> : <Button className='bg-blue-500 hover:bg-blue-600 w-full text-white rounded-md p-2'>Update</Button>}
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
UpdateProfile.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};


export default UpdateProfile

import {Dialog, DialogContent, DialogHeader, DialogTitle} from './ui/dialog.jsx'
import {Label} from './ui/label.jsx'
import {Input} from './ui/input.jsx'
import PropTypes from 'prop-types'


const UpdateProfile = ({open,setOpen}) => {
  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form action="">
                    <div className='grid gap-4 py-4'>
                        <div className=' grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Name</Label>
                            <Input type="text" id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className='col-span-1 text-right'>Email</Label>
                            <Input type="text" id='email' name='email' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Phone Number</Label>
                            <Input type="text" id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className=' grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className='col-span-1 text-right'>Name</Label>
                            <Input type="text" id='name' name='name' className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                    </div>
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

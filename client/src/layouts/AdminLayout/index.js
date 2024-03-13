import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

const AdminLayout = ({ children, location }) => {
    const { currentUser } = useSelector(userSelector);
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 bottom-0 max-w-[256px] w-full">
                <AdminSidebar />
            </div>
            <div className="fixed top-0 right-0 left-[256px] z-[9999]">
                <div className="bg-[#2a2b36] h-[64px] flex items-center justify-between px-5 text-white ">
                    <div className="text-[18px] uppercase">{location.pathname.replace('/', '')}</div>
                    <div className="flex items-center gap-3">
                        <img className="w-[40px] h-[40px] object-cover rounded-full" src={currentUser?.avatar} alt="" />
                        <h3>{currentUser?.fullName}</h3>
                    </div>
                </div>
            </div>
            <div className="ml-[256px]">{children}</div>
        </div>
    );
};

export default withBaseComponent(AdminLayout);

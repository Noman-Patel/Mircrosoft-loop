"use client"
import Logo from '@/app/_components/Logo'
import { OrganizationSwitcher, UserButton, useAuth, useUser } from '@clerk/nextjs'
import React from 'react'

function Header(){

    const {orgId} = useAuth();

    const { user } = useUser();


    console.log(orgId);


  return (
    <div className='flex justify-between ietms-center p-3 shadow-md'>
        <Logo/>
        <OrganizationSwitcher 
        afterCreateOrganizationUrl={'/dashboard'}
        afterLeaveOrganizationUrl={'/dashboard'}/>
        <UserButton/>
    </div>
  )
}

export default Header
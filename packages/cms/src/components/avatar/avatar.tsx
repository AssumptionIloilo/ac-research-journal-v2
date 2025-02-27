'use client'

import { useAuth } from '@payloadcms/ui'
import { DefaultAccountIcon } from '@payloadcms/ui/graphics/Account/Default'
import { FC } from 'react'

import { Media, User } from '@/payload-types'

import './avatar.scss'

type AvatarType = {
  avatarProps: any
}

/** For PayloadCMS Only. Displays the Avatar */
const Avatar: FC<AvatarType> = (props) => {
  const { user } = useAuth() as unknown as { user: User }

  const avatarImage = user?.avatarImage as Media

  return (
    <div className="avatar-container">
      <span>{user?.name?.split(' ')?.[0]}</span>
      {avatarImage?.url ? (
        <div
          style={{
            backgroundImage: `url('${avatarImage.url}')`,
            backgroundSize: 'cover',
          }}
        />
      ) : (
        <DefaultAccountIcon active={true} />
      )}
    </div>
  )
}

export default Avatar

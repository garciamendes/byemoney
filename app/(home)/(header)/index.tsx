'use client'

import { Avatar } from "@/components/retroui/Avatar"
import { ContextMenu } from "@/components/retroui/ContextMenu"
import { Loader } from "@/components/retroui/Loader"
import { Tooltip } from "@/components/tooltipCustom"
import { useTheme } from "@/hooks/theme"
import { useAuth } from "@/hooks/useAuth"
import { useUser } from "@/hooks/user"
import { MoonIcon, SignOutIcon, SunIcon } from "@phosphor-icons/react"

export const Header = () => {
  const { logout } = useAuth()
  const { user, loading } = useUser()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="h-16 px-2.5 w-full flex border-b items-center">
      <div className="flex flex-1 justify-end lg:max-w-[1300px] mx-auto">
        <ContextMenu>
          <ContextMenu.Trigger>
            <Tooltip legend="Botão direito do mouse para abrir o menu">
              <Avatar className="size-12 flex justify-center items-center">
                {loading ? (
                  <Loader size='sm' />
                ) : (
                  <>
                    <Avatar.Image src={user?.image as string} alt="avatar user" />
                    <Avatar.Fallback>#{user?.name.charAt(0)}</Avatar.Fallback>
                  </>
                )}
              </Avatar>
            </Tooltip>
          </ContextMenu.Trigger>

          <ContextMenu.Content>
            <ContextMenu.Item className="cursor-pointer hover:text-primary-foreground" onClick={toggleTheme}>
              {theme === 'light' ?
                <SunIcon className="hover:text-primary-foreground" size={25} /> :
                <MoonIcon className="hover:text-primary-foreground" size={25} />}

              {theme === 'light' ? 'Claro' : 'Escuro'}
            </ContextMenu.Item>

            <ContextMenu.Separator />

            <ContextMenu.Item onClick={logout} className="cursor-pointer hover:text-primary-foreground">
              <SignOutIcon className="hover:text-primary-foreground" size={25} />
              Sair
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      </div>
    </div>
  )
}
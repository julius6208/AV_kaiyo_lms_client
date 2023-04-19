import React, { useEffect, useState } from "react"
import type { FC, MouseEvent, PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import {
  AppBar,
  Box,
  Sidebar,
  ExpandableList,
  Image,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  IconButton,
} from "src/UILibrary"

import UserIcon from "src/assets/icons/user.svg"
import ApplicationIcon from "src/assets/icons/application.svg"
import UsersIcon from "src/assets/icons/users.svg"
import MealIcon from "src/assets/icons/meal.svg"
import BuildingIcon from "src/assets/icons/building.svg"
import LogoImage from "src/assets/imgs/logo_white.png"
import { ReactComponent as HamburgerIcon } from "src/assets/icons/hamburger.svg"

import { useSession } from "src/modules/sessionProvider"
import { Label } from "src/types/menu"

export const MenuLayout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [menus, setMenus] = useState<Label[]>([
    {
      icon: UserIcon,
      label: "menu.my_page",
      path: "/my-page",
    },
    {
      label: "menu.from_parent",
      icon: UsersIcon,
      path: "/application",
    },
    {
      label: "menu.meal",
      icon: MealIcon,
      path: "/meal-list",
    },
    {
      label: "menu.pdf_transfer",
      icon: BuildingIcon,
      path: "/pdf-transfer",
    },
  ])

  const onOpenMobileMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const onCloseMobileMenu = () => {
    setAnchorEl(null)
  }

  const session = useSession()

  useEffect(() => {
    if (session?.value.id === "teacher") {
      setMenus([
        {
          icon: UserIcon,
          label: "menu.my_page",
          path: "/my-page",
        },
        {
          icon: ApplicationIcon,
          label: "menu.application_list",
          path: "/teacher/application",
        },
        {
          label: "menu.user_list",
          icon: UsersIcon,
          subMenu: [
            {
              label: "menu.students",
              path: "/teacher/students",
            },
            {
              label: "menu.parents",
              path: "/teacher/parents",
            },
            {
              label: "menu.faculty_staff",
              path: "/teacher/staffs",
            },
          ],
        },
        {
          label: "menu.meal",
          icon: MealIcon,
          subMenu: [
            {
              label: "menu.meal_management",
              path: "/teacher/meal-management",
            },
            {
              label: "menu.meal_choices",
              path: "/teacher/meal-choice",
            },
          ],
        },
        {
          label: "menu.pdf_transfer",
          icon: BuildingIcon,
          path: "/teacher/pdf-transfer",
        },
      ])
    } else if (session?.value.id === "student") {
      setMenus([
        {
          icon: UserIcon,
          label: "menu.my_page",
          path: "/my-page",
        },
        {
          label: "menu.from_student",
          icon: UsersIcon,
          path: "/application",
        },
        {
          label: "menu.meal",
          icon: MealIcon,
          path: "/meal-list",
        },
        {
          label: "menu.pdf_transfer",
          icon: BuildingIcon,
          path: "/pdf-transfer",
        },
      ])
    } else if (session?.value.id === "parent") {
      setMenus([
        {
          icon: UserIcon,
          label: "menu.my_page",
          path: "/my-page",
        },
        {
          label: "menu.from_parent",
          icon: UsersIcon,
          path: "/application",
        },
        {
          label: "menu.meal",
          icon: MealIcon,
          path: "/meal-list",
        },
        {
          label: "menu.pdf_transfer",
          icon: BuildingIcon,
          path: "/pdf-transfer",
        },
      ])
    }
  }, [session])
  const menuContent = (
    <List>
      {menus?.map((m, i) =>
        m.subMenu ? (
          <ExpandableList
            key={i}
            subMenu={
              <List disablePadding>
                {m.subMenu.map((s, j) => (
                  <ListItemButton key={`${i}-${j}`} onClick={() => navigate(s.path as string)}>
                    <ListItemText primary={t(s.label)} />
                  </ListItemButton>
                ))}
              </List>
            }
          >
            <ListItemIcon>
              <Image src={m.icon as string} />
            </ListItemIcon>
            <ListItemText primary={t(m.label)} />
          </ExpandableList>
        ) : (
          <ListItemButton
            key={i}
            selected={location.pathname === m.path}
            onClick={() => navigate(m.path as string)}
          >
            <ListItemIcon>
              <Image src={m.icon as string} />
            </ListItemIcon>
            <ListItemText primary={t(m.label)} />
          </ListItemButton>
        )
      )}
    </List>
  )

  return (
    <>
      <Box sx={{ display: { md: "flex", xs: "none" }, height: "100%" }}>
        <Sidebar>{menuContent}</Sidebar>

        <Box
          overflow="auto"
          sx={{ flex: 1, height: "100%", p: 4, backgroundColor: "background.default" }}
        >
          {children}
        </Box>
      </Box>
      <Box sx={{ display: { md: "none", xs: "flex" }, height: "100%" }}>
        <AppBar position="fixed" sx={{ height: 100, px: 2, py: 0.75, justifyContent: "flex-end" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Image src={LogoImage} alt="Logo" sx={{ maxWidth: "50%" }} />

            <IconButton onClick={onOpenMobileMenu}>
              <HamburgerIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={onCloseMobileMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  marginTop: 0.75,
                  right: 0,
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                  borderRadius: "0 0 0 9px",
                },
              }}
            >
              {menuContent}
            </Popover>
          </Stack>
        </AppBar>

        <Box
          overflow="auto"
          sx={{ mt: "100px", flex: 1, p: 2, backgroundColor: "background.default" }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}

import React, { useState } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import type { DrawerProps } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Box, Button, Drawer, IconButton, Image, Stack } from "src/UILibrary"
import { useSession } from "src/modules/sessionProvider"
import { useLogout } from "src/queries/auth"

import LogoImage from "src/assets/imgs/logo_white.png"
import { ReactComponent as ArrowLeftIcon } from "src/assets/icons/arrow-left.svg"
import { AxiosError } from "axios"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: "1.25rem 0",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: theme.palette.primary.main,
  color: theme.palette.text.secondary,
  padding: "1.25rem 0",
  "& .MuiListItemText-root": {
    display: "none",
    "& + .MuiBox-root": {
      display: "none",
    },
  },
  "& .MuiCollapse-root": {
    display: "none",
  },
})

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    background: theme.palette.primary.main,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
    "& .MuiList-root": {
      flex: 1,
    },
  })
)

export const Sidebar: FC<DrawerProps> = ({ variant = "permanent", children, ...props }) => {
  const { t } = useTranslation()
  const session = useSession()
  const navigate = useNavigate()
  const [opened, setOpened] = useState(true)

  const onToggle = () => setOpened(!opened)

  const { mutate: microSoftLogout, isLoading } = useLogout({
    onSuccess: () => {
      session?.setValue()
      sessionStorage.clear()
      navigate("/")
    },
    onError: (err: AxiosError) => {
      console.error(err)
    },
  })

  return (
    <StyledDrawer variant={variant} {...props} open={opened}>
      <Box sx={{ textAlign: "right", px: 2.5 }}>
        <IconButton
          sx={
            opened
              ? {
                  "& svg": {
                    transform: "rotate(180deg)",
                  },
                }
              : undefined
          }
          onClick={onToggle}
        >
          <ArrowLeftIcon />
        </IconButton>
      </Box>

      {opened && <Image src={LogoImage} alt="Logo" sx={{ mb: 3, px: 2.5 }} />}
      {children}
      {opened && (
        <Stack direction="column" gap={1.25} sx={{ px: 2.5 }}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ fontWeight: 500, borderRadius: "10px" }}
          >
            {t("sidebar.back_to_home")}
          </Button>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ fontWeight: 500, borderRadius: "10px" }}
            loading={isLoading}
            disabled={isLoading}
            onClick={() => microSoftLogout({ code: sessionStorage.getItem("code") })}
          >
            {t("sidebar.logout")}
          </Button>
        </Stack>
      )}
    </StyledDrawer>
  )
}

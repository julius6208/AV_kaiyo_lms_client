import React, { useState } from "react"
import type { FC, PropsWithChildren, ReactNode } from "react"

import { Box, Collapse, ListItemButton } from "src/UILibrary"
import { ReactComponent as CaretTopIcon } from "src/assets/icons/caret-top.svg"

type ExpandableListProps = PropsWithChildren<{
  subMenu: ReactNode
}>

export const ExpandableList: FC<ExpandableListProps> = ({ children, subMenu }) => {
  const [opened, setOpened] = useState<boolean>(true)

  const onClick = () => setOpened(!opened)

  return (
    <>
      <ListItemButton onClick={onClick}>
        {children}
        <Box
          display="flex"
          sx={{
            "& svg": {
              transform: !opened ? "rotate(180deg)" : "none",
            },
          }}
        >
          <CaretTopIcon />
        </Box>
      </ListItemButton>
      <Collapse
        in={opened}
        timeout="auto"
        unmountOnExit
        sx={{
          paddingLeft: 1.25,
          "& .MuiListItemButton-root": {
            ml: "-10px",
            pl: "30px",
          },
        }}
      >
        {subMenu}
      </Collapse>
    </>
  )
}

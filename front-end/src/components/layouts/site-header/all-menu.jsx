import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SearchInput } from "@/components/input/search-input"
import { Menu } from "@/assets/svg"

export const AllMenu = () => {
  
  console.log("🚀 ~ AllMenu ~ AllMenu:", siteConfig)
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <div className="group flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary hover:bg-background-comment data-[state=open]:bg-[#EBF5FF]">
            <TooltipTrigger>
              <Menu className="group-data-[state=open]:text-primary" />
            </TooltipTrigger>
            <TooltipContent sideOffset={18}>Menu</TooltipContent>
          </div>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-[608px] bg-[#f7f8fa] p-0 shadow-2xl">
        <h3 className="p-4 text-2xl font-bold">Menu</h3>
        <ScrollArea className="h-[calc(100vh-150px)] px-4">
          <div className="grid grid-cols-[1fr_200px] items-start gap-4 pb-4">
            <Card>
              <CardHeader>
                <SearchInput placeholder="Search menu" />
              </CardHeader>
              <CardContent className="px-2">
                <MenuGroup
                  title="Social"
                  items={siteConfig.allMenu.slice(0, 6)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Entertainment"
                  items={siteConfig.allMenu.slice(6, 9)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Shopping"
                  items={siteConfig.allMenu.slice(9, 11)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Personal"
                  items={siteConfig.allMenu.slice(11, 15)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Professional"
                  items={siteConfig.allMenu.slice(15, 17)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Resources"
                  items={siteConfig.allMenu.slice(17, 21)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
                <MenuGroup
                  title="Resources"
                  items={siteConfig.allMenu.slice(21, 23)}
                  srcName="menu"
                  ItemComponent={MenuItem}
                />
                <div className="mx-2">
                  <Separator className="my-5" />
                </div>
              </CardContent>
            </Card>
            <Card className="sticky right-0 top-0">
              <CardHeader className="p-3">
                <CardTitle className="text-xl font-bold">Create</CardTitle>
              </CardHeader>
              <CardContent className="grid px-2">
                <MenuGroup
                  items={siteConfig.createMenu.slice(0, 3)}
                  srcName="create"
                  ItemComponent={CreateItem}
                />
                <div className="mx-2">
                  <Separator className="my-2" />
                </div>
                <MenuGroup
                  items={siteConfig.createMenu.slice(3, 8)}
                  srcName="create"
                  ItemComponent={CreateItem}
                />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}


const MenuGroup = ({ title, srcName, items, ItemComponent }) => {
  return (
    <>
      {title && <p className="p-2 pb-1 text-[17px] font-semibold">{title}</p>}
      {items.map((itm, i) => (
        <ItemComponent key={i} {...{ [srcName]: itm }} />
      ))}
    </>
  )
}

const MenuItem = ({ menu }) => {
  return (
    <div className="flex cursor-pointer gap-3 rounded-lg px-2 py-3 hover:bg-hover active:bg-active">
      <img src={menu.icon} className="h-9 w-9" />
      <div className="space-y-[10px]">
        <p className="text-[15px] font-medium">{menu.name}</p>
        <span className="text-[13px] text-muted-foreground">
          {menu.description}
        </span>
      </div>
    </div>
  )
}

const CreateItem = ({ create }) => {
  return (
    <Button
      size="xl"
      variant="ghost"
      className="justify-start gap-3 whitespace-normal text-left"
    >
      <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
        <i className={create.icon}></i>
      </div>
      <p className="text-[15px] font-medium">{create.name}</p>
    </Button>
  )
}

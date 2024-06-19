import React from "react"
import { useDebounce } from "@/hooks"

import { siteConfig } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"

import { VIEWS } from "."
import { SearchInput } from "../search-input"
import { HeadGoBack } from "./components"

const reorderLanguages = () => {
  const languages = [...siteConfig.languages]
  const idx = languages.findIndex((el) => el.key === "en_us")

  languages[0] = siteConfig.languages[idx]
  languages[idx] = siteConfig.languages[0]

  return languages
}

export const ViewFbLanguage = ({ setView }) => {
  const initialLanguages = reorderLanguages()
  const [selectedLanguage, setSelectedLanguage] = React.useState("en_us")
  const [languages, setLanguages] = React.useState(initialLanguages)
  const [input, setInput] = React.useState("")
  const debounceSearchInput = useDebounce(input, 500)

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language)
  }

  React.useEffect(() => {
    const mLanguages = initialLanguages.filter((itm) =>
      (itm.native + itm.translation).toLowerCase().includes(debounceSearchInput)
    )
    setLanguages(mLanguages)
  }, [debounceSearchInput])

  return (
    <div className="p-2">
      <HeadGoBack
        title="Facebook language"
        onBack={() => setView(VIEWS.LANGUAGE)}
        className="p-2"
      />
      <div className="mt-4">
        <SearchInput
          placeholder="Search languages"
          value={input}
          onChange={(e) => {
            console.log(e.target.value)
            setInput(e.target.value)
          }}
        />
        <ScrollArea className="h-[calc(100vh-200px)]">
          {languages.map((language) => (
            <LanguageItem
              key={language.key}
              language={language}
              selected={selectedLanguage}
              onSelect={handleSelectLanguage}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

const LanguageItem = ({ language, selected, onSelect }) => {
  const { key, native, translation } = language
  return (
    <div
      className="flex h-[58px] items-center justify-between rounded-lg px-4 py-2 hover:bg-hover"
      onClick={() => onSelect(key)}
    >
      <div className="space-y-[5px] px-[6px]">
        <p className="text-[15px] font-bold leading-none">{native}</p>
        <span className="text-xs leading-none text-muted-foreground">
          {translation}
        </span>
      </div>
      {key === selected && <i className="check_icon filter-accent"></i>}
    </div>
  )
}

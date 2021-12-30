import React, {useEffect, useState} from "react"

interface Props {
  message?: string
}

export const NowLoading = (p: Props) => {
  return (
    <div className="flex fixed inset-0 flex-col gap-4 justify-center items-center bg-gray-900">
      <div className="w-8 h-8 rounded-full border-4 border-blue-500 opacity-50 animate-spin border-t-transparent"></div>
      <div className="text-gray-400">{p.message ?? "Now loading..."}</div>
    </div>
  )
}

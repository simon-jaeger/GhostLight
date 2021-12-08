export function isSupported() {
  return (
    nameof(FileSystemFileHandle) in window &&
    nameof(FileSystemDirectoryHandle) in window &&
    true
  )
}

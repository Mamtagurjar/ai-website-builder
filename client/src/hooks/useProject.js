import { useState, useCallback } from 'react'
import { projectService } from '../services/projectService'
import toast from 'react-hot-toast'

export function useProject(id) {
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  const saveProject = useCallback(async (payload) => {
    if (!id) return
    setSaving(true)
    try {
      const { data } = await projectService.update(id, payload)
      setLastSaved(new Date())
      return data
    } catch (err) {
      toast.error('Auto-save failed')
      throw err
    } finally {
      setSaving(false)
    }
  }, [id])

  return { saving, lastSaved, saveProject }
}

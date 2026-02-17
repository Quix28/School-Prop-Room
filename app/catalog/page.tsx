'use client'

import { useState, useEffect } from 'react'
import { supabase, Item } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CatalogPage() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prop' | 'costume'>('all')
  const [searchTerm, setSearchTerm] = useState('')
}
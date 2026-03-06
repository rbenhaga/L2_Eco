/**
 * ModuleHub - Legacy Entry Point
 * 
 * This file now re-exports from the refactored module-hub directory.
 * Kept for backward compatibility with existing imports.
 * 
 * New imports should use: import ModuleHub from '@/components/module-hub'
 */

export { default } from '../module-hub';
export type { 
    ModuleHubProps, 
    ModuleChapter, 
    ModuleStats, 
    ContentType,
    RecentUpdate,
    ModuleId
} from '../module-hub/types';

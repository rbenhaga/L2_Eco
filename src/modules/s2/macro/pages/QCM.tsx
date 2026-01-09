/**
 * MacroQCM Page
 * Uses the unified QCMPlayer with Macro-specific data
 */

import { QCMPlayer } from '../../../../features/qcm';
import qcmData from '../data/qcm.json';
import type { QCMConfig } from '../../../../features/qcm';

export function QCM() {
  return (
    <QCMPlayer
      config={qcmData as QCMConfig}
      subjectColor="#3b82f6"
      backLink="/macro"
    />
  );
}

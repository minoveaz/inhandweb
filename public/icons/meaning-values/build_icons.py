import os
import math
import shutil
import fitz

BASE_DIR = "/Users/minoveaz/Documents/Proyectos/sparklight/Inhand/icons/meaning-values"
SCRATCH_DIR = "/Users/minoveaz/.gemini/antigravity/brain/772215a7-5e85-4d7b-92e7-533d8bc1010b/scratch"

def make_svg(inner_content):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <style>
    .ih-p {{ stroke: var(--ih-icon-primary, #2638A5); }}
    .ih-a {{ stroke: var(--ih-icon-accent, #fc6c21); }}
    .ih-pf {{ fill: var(--ih-icon-primary, #2638A5); stroke: none; }}
    .ih-af {{ fill: var(--ih-icon-accent, #fc6c21); stroke: none; }}
  </style>
{inner_content}
</svg>
'''

# Closed-wrist profile hand (used in 02_emotions_values/kindness and 03_community_relationships/service)
HAND_CLOSED_WRIST = '''  <path class="ih-p" d="M 4.2 15.2 L 4.5 18.8 L 13.5 18.8 C 14.8 18.8 16.2 18.2 17.4 17.2 L 20.2 14.8 C 20.8 14.2 20.2 13.2 19.3 13.5 L 15.8 15.4"/>
  <path class="ih-p" d="M 4.2 15.2 C 5.8 13.8 8.2 13.5 10.5 14.5 L 14.5 15.6 C 15.5 15.8 15.6 16.8 14.5 16.8 L 10.2 16.6"/>'''

# Open-wrist profile hand (used in 03_community_relationships/support)
HAND_OPEN_WRIST = '''  <path class="ih-p" d="M 4.2 15.2 C 5.8 13.6 8.2 13.4 10.5 14.5 L 14.5 15.6 C 15.5 15.8 15.6 16.8 14.5 16.8 L 10.2 16.6"/>
  <path class="ih-p" d="M 15.5 15.5 L 19.3 13.5 C 20.2 13.2 20.8 14.2 20.2 14.8 L 17.4 17.2 C 16.2 18.2 14.8 18.8 13.5 18.8 L 4.2 18.2"/>'''

SMALL_HEART_OUTLINE = '''  <path class="ih-a" d="M 13.8 12.2 L 10.8 9.2 A 2.1 2.1 0 0 1 13.8 6.2 A 2.1 2.1 0 0 1 16.8 9.2 Z"/>'''

ICONS = {
    "01_faith_spirituality": {
        "cross": '''  <line class="ih-p" x1="12" y1="4.5" x2="12" y2="19.5"/>
  <line class="ih-p" x1="5.5" y1="12" x2="18.5" y2="12"/>
  <circle class="ih-af" cx="12" cy="12" r="2"/>''',

        "prayer": '''  <path class="ih-p" d="M 5.8 17.5 L 8.8 14.8 L 9.3 11.4"/>
  <path class="ih-p" d="M 9.3 12.2 L 10.5 7.8 C 10.7 7.1 11.3 6.8 12 6.8 L 12 16 L 8.2 19.2"/>
  <path class="ih-p" d="M 18.2 17.5 L 15.2 14.8 L 14.7 11.4"/>
  <path class="ih-p" d="M 14.7 12.2 L 13.5 7.8 C 13.3 7.1 12.7 6.8 12 6.8 L 12 16 L 15.8 19.2"/>
  <line class="ih-a" x1="12" y1="3.2" x2="12" y2="5.0"/>
  <line class="ih-a" x1="8.0" y1="4.5" x2="9.2" y2="5.7"/>
  <line class="ih-a" x1="16.0" y1="4.5" x2="14.8" y2="5.7"/>''',

        "bible": '''  <path class="ih-p" d="M 12 6.8 C 9.6 5.4 6.6 5.4 4.5 6.4 L 3.8 17.8 C 6.4 16.8 9.4 16.8 12 18.2 C 14.6 16.8 17.6 16.8 20.2 17.8 L 19.5 6.4 C 17.4 5.4 14.4 5.4 12 6.8 Z"/>
  <line class="ih-p" x1="12" y1="15.8" x2="12" y2="18.2"/>
  <line class="ih-a" x1="12" y1="6.8" x2="12" y2="16.2"/>''',

        "light": '''  <circle class="ih-a" cx="12" cy="12" r="3.8"/>
  <line class="ih-p" x1="12" y1="3.8" x2="12" y2="5.8"/>
  <line class="ih-p" x1="12" y1="18.2" x2="12" y2="20.2"/>
  <line class="ih-p" x1="3.8" y1="12" x2="5.8" y2="12"/>
  <line class="ih-p" x1="18.2" y1="12" x2="20.2" y2="12"/>
  <line class="ih-p" x1="6.2" y1="6.2" x2="7.6" y2="7.6"/>
  <line class="ih-p" x1="17.8" y1="17.8" x2="16.4" y2="16.4"/>
  <line class="ih-p" x1="17.8" y1="6.2" x2="16.4" y2="7.6"/>
  <line class="ih-p" x1="6.2" y1="17.8" x2="7.6" y2="16.4"/>''',

        "path": '''  <path class="ih-p" d="M 4.5 18.8 C 5.0 14.8 8.8 14.8 10.5 12.2 C 11.6 10.5 10.6 8.5 12.2 7.5"/>
  <path class="ih-p" d="M 11.5 19.5 C 11.6 16.8 14.2 16.0 15.0 13.8 C 15.6 12.0 14.0 10.6 14.5 9.2"/>
  <circle class="ih-af" cx="16.2" cy="5.8" r="2.2"/>''',

        "hope": '''  <line class="ih-p" x1="3.8" y1="16.5" x2="20.2" y2="16.5"/>
  <path class="ih-p" d="M 7.2 16.5 A 4.8 4.8 0 0 1 16.8 16.5"/>
  <line class="ih-a" x1="12" y1="6.2" x2="12" y2="9.0"/>
  <line class="ih-a" x1="6.5" y1="9.8" x2="8.0" y2="11.2"/>
  <line class="ih-a" x1="17.5" y1="9.8" x2="16.0" y2="11.2"/>''',

        "guidance": '''  <circle class="ih-p" cx="12" cy="12" r="8"/>
  <path class="ih-a" d="M 15.2 8.8 L 13.2 13.2 L 8.8 15.2 L 10.8 10.8 Z"/>''',

        "grace": '''  <path class="ih-p" d="M 12 4.2 C 12 4.2 6.5 11.0 6.5 14.8 A 5.5 5.5 0 0 0 17.5 14.8 C 17.5 11.0 12 4.2 12 4.2 Z"/>
  <circle class="ih-af" cx="12" cy="15.0" r="1.4"/>''',

        "worship": '''  <path class="ih-p" d="M 7.2 19.2 L 7.2 15.8 L 4.4 13.0 L 4.4 8.6 C 4.4 7.4 6.6 7.4 6.6 8.6 L 6.6 12.2"/>
  <path class="ih-p" d="M 6.6 8.2 C 6.6 7.0 8.8 7.0 8.8 8.2 L 8.8 12.6"/>
  <path class="ih-p" d="M 8.8 10.2 C 10.2 10.2 11.0 11.2 11.0 12.6 L 11.0 14.5 L 10.2 16.0 L 10.2 19.2"/>
  <path class="ih-p" d="M 16.8 19.2 L 16.8 15.8 L 19.6 13.0 L 19.6 8.6 C 19.6 7.4 17.4 7.4 17.4 8.6 L 17.4 12.2"/>
  <path class="ih-p" d="M 17.4 8.2 C 17.4 7.0 15.2 7.0 15.2 8.2 L 15.2 12.6"/>
  <path class="ih-p" d="M 15.2 10.2 C 13.8 10.2 13.0 11.2 13.0 12.6 L 13.0 14.5 L 13.8 16.0 L 13.8 19.2"/>
  <circle class="ih-af" cx="12" cy="5.8" r="1.4"/>''',

        "truth": '''  <line class="ih-p" x1="12" y1="3.8" x2="12" y2="9.2"/>
  <line class="ih-p" x1="12" y1="14.8" x2="12" y2="20.2"/>
  <line class="ih-p" x1="3.8" y1="12" x2="9.2" y2="12"/>
  <line class="ih-p" x1="14.8" y1="12" x2="20.2" y2="12"/>
  <line class="ih-p" x1="8.2" y1="8.2" x2="9.4" y2="9.4"/>
  <line class="ih-p" x1="15.8" y1="15.8" x2="14.6" y2="14.6"/>
  <line class="ih-p" x1="15.8" y1="8.2" x2="14.6" y2="9.4"/>
  <line class="ih-p" x1="8.2" y1="15.8" x2="9.4" y2="14.6"/>
  <path class="ih-af" d="M 12 8.2 C 12.5 10.5 13.5 11.5 15.8 12 C 13.5 12.5 12.5 13.5 12 15.8 C 11.5 13.5 10.5 12.5 8.2 12 C 10.5 11.5 11.5 10.5 12 8.2 Z"/>''',

        "purpose": '''  <path class="ih-p" d="M 4.5 18.8 L 9.5 13.5 L 13.8 18.2"/>
  <path class="ih-p" d="M 9.8 13.8 L 13.2 10.2 L 19.5 18.8"/>
  <line class="ih-p" x1="13.2" y1="10.2" x2="13.2" y2="4.5"/>
  <path class="ih-a" d="M 13.2 4.8 L 16.5 4.8 L 15.5 6.2 L 16.5 7.6 L 13.2 7.6"/>
  <line class="ih-a" x1="14.2" y1="16.5" x2="15.0" y2="15.5"/>''',

        "eternity": '''  <path class="ih-p" d="M 12 12 C 9.5 9.2 7.6 8.2 5.6 8.2 A 3.8 3.8 0 1 0 5.6 15.8 C 7.6 15.8 9.5 14.8 12 12 C 14.5 9.2 16.4 8.2 18.4 8.2 A 3.8 3.8 0 1 1 18.4 15.8 C 16.4 15.8 14.5 14.8 12 12 Z"/>
  <path class="ih-a" d="M 8.2 15.0 C 9.0 14.6 9.8 14.0 10.6 13.3"/>
  <path class="ih-a" d="M 13.4 10.7 C 14.2 10.0 15.0 9.4 15.8 9.0"/>''',
    },

    "02_emotions_values": {
        "love": '''  <path class="ih-p" d="M 12 19.5 L 5.4 12.9 A 4.3 4.3 0 0 1 11.5 6.8 L 12 7.3 L 12.5 6.8 A 4.3 4.3 0 0 1 18.6 12.9 Z"/>
  <line class="ih-a" x1="7.8" y1="15.3" x2="9.0" y2="16.5"/>''',

        "joy": '''  <path class="ih-p" d="M 6.2 12.2 A 5.8 5.8 0 0 0 17.8 12.2"/>
  <circle class="ih-af" cx="12" cy="9.0" r="1.5"/>''',

        "gratitude": '''  <path class="ih-p" d="M 12 18.2 L 7.6 13.8 A 2.8 2.8 0 0 1 11.6 9.8 L 12 10.2 L 12.4 9.8 A 2.8 2.8 0 0 1 16.4 13.8 Z"/>
  <line class="ih-a" x1="12" y1="4.5" x2="12" y2="6.4"/>
  <line class="ih-a" x1="7.0" y1="6.4" x2="8.3" y2="7.7"/>
  <line class="ih-a" x1="17.0" y1="6.4" x2="15.7" y2="7.7"/>
  <line class="ih-a" x1="4.5" y1="11.5" x2="6.2" y2="11.5"/>
  <line class="ih-a" x1="19.5" y1="11.5" x2="17.8" y2="11.5"/>''',

        "peace": '''  <path class="ih-p" d="M 12 5.2 C 9.2 9.2 9.2 14.5 12 18.5 C 14.8 14.5 14.8 9.2 12 5.2 Z"/>
  <path class="ih-p" d="M 12 18.5 C 7.2 17.8 4.8 14.2 4.5 10.2 C 8.2 10.2 11.2 13.2 12 18.5 Z"/>
  <path class="ih-p" d="M 12 18.5 C 16.8 17.8 19.2 14.2 19.5 10.2 C 15.8 10.2 12.8 13.2 12 18.5 Z"/>''',

        "strength": '''  <path class="ih-p" d="M 4.2 17.8 L 9.8 9.5 L 12.2 13.2"/>
  <path class="ih-p" d="M 9.8 9.5 L 13.0 5.0 L 20.2 17.8"/>
  <path class="ih-a" d="M 12.2 15.5 L 13.4 17.5 L 15.5 14.2"/>''',

        "courage": '''  <path class="ih-p" d="M 12 4.0 L 18.2 6.6 L 18.2 12.0 C 18.2 16.0 15.4 18.6 12 20.2 C 8.6 18.6 5.8 16.0 5.8 12.0 L 5.8 6.6 Z"/>
  <circle class="ih-af" cx="12" cy="11.8" r="1.4"/>''',

        "patience": '''  <line class="ih-p" x1="7.2" y1="4.8" x2="16.8" y2="4.8"/>
  <line class="ih-p" x1="7.2" y1="19.2" x2="16.8" y2="19.2"/>
  <path class="ih-p" d="M 8.0 4.8 C 8.0 9.0 12 10.6 12 12 C 12 13.4 8.0 15.0 8.0 19.2"/>
  <path class="ih-p" d="M 16.0 4.8 C 16.0 9.0 12 10.6 12 12 C 12 13.4 16.0 15.0 16.0 19.2"/>''',

        "kindness": HAND_CLOSED_WRIST + "\n" + SMALL_HEART_OUTLINE,

        "humility": '''  <line class="ih-p" x1="12" y1="20.0" x2="12" y2="8.2"/>
  <path class="ih-p" d="M 12 16.8 C 8.0 16.8 5.5 13.8 5.5 9.8 C 9.2 9.8 12 12.8 12 16.8 Z"/>
  <path class="ih-p" d="M 12 15.0 C 16.2 15.0 18.8 11.8 18.8 7.8 C 14.8 7.8 12 10.8 12 15.0 Z"/>
  <circle class="ih-af" cx="12" cy="5.5" r="1.6"/>''',

        "trust": '''  <circle class="ih-p" cx="9.6" cy="12" r="4.8"/>
  <circle class="ih-p" cx="14.4" cy="12" r="4.8"/>
  <path class="ih-a" d="M 13.5 9.2 A 4.8 4.8 0 0 1 13.5 14.8"/>''',

        "transformation": '''  <path class="ih-p" d="M 12 10.8 C 9.2 6.2 4.2 5.2 4.2 8.8 C 4.2 11.8 7.5 13.5 12 13.5 Z"/>
  <path class="ih-p" d="M 12 10.8 C 14.8 6.2 19.8 5.2 19.8 8.8 C 19.8 11.8 16.5 13.5 12 13.5 Z"/>
  <path class="ih-p" d="M 12 13.5 C 8.2 13.5 6.5 16.2 7.5 18.5 C 8.5 20.5 11.2 19.2 12 15.2 Z"/>
  <path class="ih-p" d="M 12 13.5 C 15.8 13.5 17.5 16.2 16.5 18.5 C 15.5 20.5 12.8 19.2 12 15.2 Z"/>
  <line class="ih-p" x1="12" y1="8.8" x2="12" y2="18.2"/>
  <path class="ih-a" d="M 9.8 5.2 L 12 7.5 L 14.2 5.2"/>''',

        "purpose": '''  <circle class="ih-p" cx="12" cy="12" r="7.8"/>
  <circle class="ih-a" cx="12" cy="12" r="3.0"/>''',
    },

    "03_community_relationships": {
        "community": '''  <ellipse class="ih-p" cx="12" cy="7.8" rx="2.2" ry="2.6"/>
  <path class="ih-p" d="M 7.8 18.2 C 7.5 14.5 9.4 12.5 12 12.5 C 14.6 12.5 16.5 14.5 16.2 18.2"/>
  <circle class="ih-p" cx="6.8" cy="10.2" r="1.8"/>
  <path class="ih-p" d="M 3.5 18.5 C 3.5 15.2 5.0 13.8 7.6 13.8"/>
  <circle class="ih-p" cx="17.2" cy="10.2" r="1.8"/>
  <path class="ih-p" d="M 20.5 18.5 C 20.5 15.2 19.0 13.8 16.4 13.8"/>''',

        "family": '''  <circle class="ih-p" cx="8.6" cy="10.2" r="2.0"/>
  <path class="ih-p" d="M 4.5 18.8 C 4.5 15.2 6.2 13.8 8.6 13.8 C 10.6 13.8 12.0 15.2 12.0 18.2"/>
  <circle class="ih-p" cx="15.4" cy="10.2" r="2.0"/>
  <path class="ih-p" d="M 12.0 18.2 C 12.0 15.2 13.4 13.8 15.4 13.8 C 17.8 13.8 19.5 15.2 19.5 18.8"/>
  <circle class="ih-af" cx="12" cy="5.5" r="1.8"/>''',

        "friends": '''  <circle class="ih-p" cx="9.2" cy="8.8" r="2.3"/>
  <path class="ih-p" d="M 4.5 18.8 C 4.5 14.8 6.5 13.0 9.2 13.0 C 12.0 13.0 14.0 14.8 14.0 18.8"/>
  <circle class="ih-p" cx="15.0" cy="8.8" r="2.3"/>
  <path class="ih-p" d="M 12.2 13.6 C 13.0 13.2 14.0 13.0 15.0 13.0 C 17.6 13.0 19.5 14.8 19.5 18.8"/>''',

        "support": HAND_OPEN_WRIST + "\n" + SMALL_HEART_OUTLINE,

        "together": '''  <circle class="ih-p" cx="9.5" cy="12" r="5.0"/>
  <circle class="ih-p" cx="14.5" cy="12" r="5.0"/>
  <path class="ih-a" d="M 13.6 9.1 A 5.0 5.0 0 0 1 13.6 14.9"/>''',

        "sharing": '''  <circle class="ih-p" cx="6.5" cy="12" r="2.2"/>
  <circle class="ih-p" cx="16.5" cy="6.8" r="2.2"/>
  <circle class="ih-p" cx="16.5" cy="17.2" r="2.2"/>
  <line class="ih-p" x1="8.5" y1="11.0" x2="14.5" y2="7.8"/>
  <line class="ih-p" x1="8.5" y1="13.0" x2="14.5" y2="16.2"/>''',

        "conversation": '''  <path class="ih-p" d="M 12 4.5 A 7.5 7.5 0 0 0 5.8 16.2 L 4.8 19.2 L 8.2 18.0 A 7.5 7.5 0 1 0 12 4.5 Z"/>
  <circle class="ih-af" cx="9.0" cy="12.0" r="1.1"/>
  <circle class="ih-af" cx="12.0" cy="12.0" r="1.1"/>
  <circle class="ih-af" cx="15.0" cy="12.0" r="1.1"/>''',

        "connection": '''  <path class="ih-p" d="M 12 19.5 L 6.4 13.9 A 3.5 3.5 0 0 1 11.4 8.9 L 12 9.5 L 12.6 8.9 A 3.5 3.5 0 0 1 17.6 13.9 Z"/>
  <circle class="ih-p" cx="6.2" cy="6.2" r="1.9"/>
  <circle class="ih-p" cx="17.8" cy="6.2" r="1.9"/>
  <circle class="ih-af" cx="12" cy="14.2" r="1.2"/>''',

        "mentorship": '''  <circle class="ih-p" cx="8.5" cy="10.8" r="2.0"/>
  <path class="ih-p" d="M 4.5 18.8 C 4.5 15.6 6.2 14.2 8.5 14.2 C 10.5 14.2 12.0 15.5 12.0 18.2"/>
  <circle class="ih-p" cx="15.5" cy="10.8" r="2.0"/>
  <path class="ih-p" d="M 12.0 18.2 C 12.0 15.5 13.5 14.2 15.5 14.2 C 17.8 14.2 19.5 15.6 19.5 18.8"/>
  <line class="ih-a" x1="12" y1="3.5" x2="12" y2="7.5"/>
  <line class="ih-a" x1="10" y1="5.5" x2="14" y2="5.5"/>''',

        "service": HAND_CLOSED_WRIST + "\n" + SMALL_HEART_OUTLINE,

        "belonging": '''  <path class="ih-p" d="M 5.0 11.0 L 12 4.2 L 19.0 11.0 L 19.0 19.2 L 14.2 19.2 L 14.2 14.8 A 2.2 2.2 0 0 0 9.8 14.8 L 9.8 19.2 L 5.0 19.2 Z"/>''',

        "unity": "\n".join(
            [f'  <circle class="ih-p" cx="{12 + 6.2*math.cos(math.radians(a)):.2f}" cy="{12.4 + 6.2*math.sin(math.radians(a)):.2f}" r="1.7"/>' for a in [-90, -18, 54, 126, 198]] +
            [f'  <line class="ih-a" x1="{12 + 6.2*math.cos(math.radians(a+24)):.2f}" y1="{12.4 + 6.2*math.sin(math.radians(a+24)):.2f}" x2="{12 + 6.2*math.cos(math.radians(a+48)):.2f}" y2="{12.4 + 6.2*math.sin(math.radians(a+48)):.2f}"/>' for a in [-90, -18, 54, 126, 198]]
        ),
    },

    "04_everyday_life": {
        "daily-life": '''  <circle class="ih-p" cx="12" cy="12" r="4.2"/>
  <line class="ih-p" x1="12" y1="3.5" x2="12" y2="5.5"/>
  <line class="ih-p" x1="12" y1="18.5" x2="12" y2="20.5"/>
  <line class="ih-p" x1="3.5" y1="12" x2="5.5" y2="12"/>
  <line class="ih-p" x1="18.5" y1="12" x2="20.5" y2="12"/>
  <line class="ih-a" x1="6.0" y1="6.0" x2="7.4" y2="7.4"/>
  <line class="ih-a" x1="18.0" y1="18.0" x2="16.6" y2="16.6"/>
  <line class="ih-a" x1="18.0" y1="6.0" x2="16.6" y2="7.4"/>
  <line class="ih-a" x1="6.0" y1="18.0" x2="7.4" y2="16.6"/>''',

        "study": '''  <path class="ih-p" d="M 12 6.8 C 9.5 5.4 6.5 5.4 4.2 6.4 L 4.2 18.0 C 6.5 17.0 9.5 17.0 12 18.4 C 14.5 17.0 17.5 17.0 19.8 18.0 L 19.8 6.4 C 17.5 5.4 14.5 5.4 12 6.8 Z"/>
  <line class="ih-p" x1="12" y1="15.5" x2="12" y2="18.4"/>
  <line class="ih-a" x1="12" y1="6.8" x2="12" y2="15.5"/>''',

        "work": '''  <path class="ih-p" d="M 5.4 16.2 L 5.4 6.8 C 5.4 6.2 5.8 5.8 6.4 5.8 L 17.6 5.8 C 18.2 5.8 18.6 6.2 18.6 6.8 L 18.6 16.2"/>
  <line class="ih-p" x1="3.2" y1="16.2" x2="20.8" y2="16.2"/>
  <line class="ih-a" x1="10.2" y1="16.2" x2="13.8" y2="16.2"/>''',

        "travel": '''  <path class="ih-p" d="M 12 20.0 C 12 20.0 6.2 14.2 6.2 9.8 A 5.8 5.8 0 0 1 17.8 9.8 C 17.8 14.2 12 20.0 12 20.0 Z"/>
  <circle class="ih-af" cx="12" cy="9.8" r="2.0"/>''',

        "creativity": '''  <path class="ih-p" d="M 12 4.2 A 7.8 7.8 0 1 0 12 19.8 C 13.8 19.8 14.8 18.6 14.8 17.2 C 14.8 16.0 14.0 15.2 14.0 14.2 C 14.0 13.0 15.0 12.2 16.4 12.2 L 17.2 12.2 A 2.6 2.6 0 0 0 19.8 9.6 C 19.8 6.4 16.3 4.2 12 4.2 Z"/>
  <circle class="ih-af" cx="11.2" cy="8.0" r="1.2"/>
  <circle class="ih-af" cx="8.4" cy="10.4" r="1.2"/>
  <circle class="ih-af" cx="9.2" cy="14.5" r="1.2"/>
  <circle class="ih-pf" cx="15.0" cy="9.2" r="1.2"/>''',

        "nature": '''  <path class="ih-p" d="M 7.2 17.2 C 5.0 12.0 8.8 7.5 18.2 5.2 C 18.8 14.0 14.0 18.2 7.2 17.2 Z"/>
  <path class="ih-p" d="M 6.8 19.5 C 7.2 16.8 8.4 14.5 10.2 12.6"/>
  <path class="ih-a" d="M 9.6 13.2 C 10.6 12.0 11.8 11.2 13.2 10.5"/>''',

        "rest": '''  <path class="ih-p" d="M 11.8 5.0 A 7.2 7.2 0 1 0 18.8 15.2 A 5.6 5.6 0 0 1 11.8 5.0 Z"/>
  <path class="ih-a" d="M 7.8 16.2 L 9.5 14.8"/>
  <path class="ih-p" d="M 14.2 8.2 L 16.4 8.2 L 14.2 11.0 L 16.4 11.0"/>
  <path class="ih-p" d="M 17.8 5.0 L 19.8 5.0 L 17.8 7.5 L 19.8 7.5"/>''',

        "balance": '''  <ellipse class="ih-p" cx="12" cy="5.8" rx="2.6" ry="1.7"/>
  <ellipse class="ih-p" cx="12" cy="11.0" rx="4.6" ry="2.2"/>
  <ellipse class="ih-p" cx="12" cy="16.8" rx="6.2" ry="2.5"/>
  <line class="ih-a" x1="10.0" y1="11.0" x2="14.0" y2="11.0"/>''',

        "goals": '''  <line class="ih-p" x1="6.8" y1="18.8" x2="6.8" y2="13.8"/>
  <line class="ih-p" x1="11.5" y1="18.8" x2="11.5" y2="9.8"/>
  <line class="ih-p" x1="16.2" y1="18.8" x2="16.2" y2="5.5"/>
  <line class="ih-a" x1="16.2" y1="17.2" x2="16.2" y2="10.0"/>''',

        "growth": '''  <line class="ih-p" x1="12" y1="19.8" x2="12" y2="11.5"/>
  <path class="ih-p" d="M 12 16.2 C 7.2 16.2 4.5 12.8 4.5 8.5 C 8.8 8.5 12 11.8 12 16.2 Z"/>
  <path class="ih-p" d="M 12 16.2 C 16.8 16.2 19.5 12.8 19.5 8.5 C 15.2 8.5 12 11.8 12 16.2 Z"/>
  <circle class="ih-af" cx="12" cy="6.0" r="1.6"/>''',

        "gift": '''  <rect class="ih-p" x="4.5" y="8.5" width="15" height="3.2" rx="1.0"/>
  <path class="ih-p" d="M 5.8 11.7 L 5.8 18.8 C 5.8 19.4 6.2 19.8 6.8 19.8 L 17.2 19.8 C 17.8 19.8 18.2 19.4 18.2 18.8 L 18.2 11.7"/>
  <line class="ih-p" x1="12" y1="8.5" x2="12" y2="19.8"/>
  <path class="ih-p" d="M 12 8.5 C 12 8.5 7.8 8.5 7.8 6.0 C 7.8 4.5 10.5 4.5 12 8.5 Z"/>
  <path class="ih-p" d="M 12 8.5 C 12 8.5 16.2 8.5 16.2 6.0 C 16.2 4.5 13.5 4.5 12 8.5 Z"/>''',

        "celebration": '''  <path class="ih-p" d="M 9.5 4.5 C 9.5 8.5 8.0 10.0 4.0 10.0 C 8.0 10.0 9.5 11.5 9.5 15.5 C 9.5 11.5 11.0 10.0 15.0 10.0 C 11.0 10.0 9.5 8.5 9.5 4.5 Z"/>
  <path class="ih-p" d="M 18.0 11.5 C 18.0 13.5 17.2 14.2 15.2 14.2 C 17.2 14.2 18.0 15.0 18.0 17.0 C 18.0 15.0 18.8 14.2 20.8 14.2 C 18.8 14.2 18.0 13.5 18.0 11.5 Z"/>
  <path class="ih-af" d="M 15.8 5.0 C 15.8 6.0 15.3 6.5 14.3 6.5 C 15.3 6.5 15.8 7.0 15.8 8.0 C 15.8 7.0 16.3 6.5 17.3 6.5 C 16.3 6.5 15.8 6.0 15.8 5.0 Z"/>
  <path class="ih-af" d="M 14.0 16.5 C 14.0 17.7 13.4 18.3 12.2 18.3 C 13.4 18.3 14.0 18.9 14.0 20.1 C 14.0 18.9 14.6 18.3 15.8 18.3 C 14.6 18.3 14.0 17.7 14.0 16.5 Z"/>''',
    }
}

os.makedirs(BASE_DIR, exist_ok=True)

total = 0
for cat, icons in ICONS.items():
    cat_dir = os.path.join(BASE_DIR, cat)
    os.makedirs(cat_dir, exist_ok=True)
    for name, content in icons.items():
        svg_path = os.path.join(cat_dir, f"{name}.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(make_svg(content))
        total += 1

print(f"Generated {total} icons in {BASE_DIR}")

from PIL import Image, ImageDraw

cols = 12
rows = 4
cell_w = 120
cell_h = 130
sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), (245, 246, 250))
draw = ImageDraw.Draw(sheet)

for r, (cat, icons) in enumerate(ICONS.items()):
    for c, (name, content) in enumerate(icons.items()):
        svg_path = os.path.join(BASE_DIR, cat, f"{name}.svg")
        with open(svg_path, "r", encoding="utf-8") as sf:
            svg_raw = sf.read()
        svg_for_fitz = (svg_raw
            .replace('class="ih-p"', 'stroke="#2638A5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"')
            .replace('class="ih-a"', 'stroke="#fc6c21" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"')
            .replace('class="ih-pf"', 'fill="#2638A5" stroke="none"')
            .replace('class="ih-af"', 'fill="#fc6c21" stroke="none"'))
        doc = fitz.open(stream=svg_for_fitz.encode("utf-8"), filetype="svg")
        page = doc[0]
        pix = page.get_pixmap(dpi=240, alpha=True)
        icon_img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
        x = c * cell_w + (cell_w - icon_img.width) // 2
        y = r * cell_h + 12
        sheet.paste(icon_img, (x, y), icon_img)
        draw.text((c * cell_w + 10, r * cell_h + 104), name, fill=(38, 56, 165))

sheet.save(os.path.join(BASE_DIR, "preview.png"))
target_script = os.path.join(BASE_DIR, "build_icons.py")
if os.path.abspath(__file__) != os.path.abspath(target_script):
    shutil.copy(__file__, target_script)

CAT_INFO = {
    "01_faith_spirituality": ("01. Faith & Spirituality", "Icons to represent faith, prayer and spiritual growth."),
    "02_emotions_values": ("02. Emotions & Values", "Icons for the key emotions and values of the brand."),
    "03_community_relationships": ("03. Community & Relationships", "Icons that represent people, connection and support."),
    "04_everyday_life": ("04. Everyday Life", "Icons for daily moments, products and thematic sections."),
}

sections_html = []
for cat, icons in ICONS.items():
    title, desc = CAT_INFO[cat]
    cards = []
    for name in icons.keys():
        svg_path = os.path.join(BASE_DIR, cat, f"{name}.svg")
        with open(svg_path, "r", encoding="utf-8") as f:
            svg_code = f.read().strip()
        label = name.replace("-", " ")
        cards.append(f'<button class="card" onclick="copy(this)" data-file="{cat}/{name}.svg">{svg_code}<span>{label}</span></button>')
    cards_joined = "".join(cards)
    sections_html.append(f'<section><h2>{title}</h2><p>{desc}</p><div class="grid">{cards_joined}</div></section>')

all_sections = "".join(sections_html)
html = f"""<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>02. Meaning &amp; Values Icon Set — INHAND</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{{--ih-icon-primary:#2638A5;--ih-icon-accent:#fc6c21}}
*{{box-sizing:border-box;margin:0}}body{{font-family:Manrope,sans-serif;background:#F3E7DE;color:#272A32;padding:40px 24px}}
.wrap{{max-width:1280px;margin:auto;background:#FDF9F6;border-radius:16px;padding:40px}}
header{{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;border-bottom:2px solid #2638A5;padding-bottom:20px;margin-bottom:28px}}
h1{{font-family:"Space Grotesk";color:#2638A5;font-size:30px}}h1 b{{color:#fc6c21}}
.controls{{display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap}}.controls label{{display:flex;gap:6px;align-items:center;font-weight:600}}
.controls button,.controls a{{border:1px solid #2638A5;background:none;color:#2638A5;border-radius:999px;padding:6px 14px;cursor:pointer;text-decoration:none;font-weight:600;font-size:12px}}
.controls button:hover,.controls a:hover{{background:#2638A5;color:#fff}}
section{{margin-bottom:32px}}h2{{font-family:"Space Grotesk";color:#2638A5;font-size:15px;text-transform:uppercase;letter-spacing:.06em}}
section p{{font-size:13px;opacity:.65;margin:4px 0 14px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:12px}}
.card{{background:#fff;border:1px solid rgba(38,56,165,.12);border-radius:10px;padding:16px 6px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;font:600 11px Manrope;color:#272A32;text-transform:capitalize;transition:all .15s}}
.card:hover{{border-color:var(--ih-icon-primary);transform:translateY(-2px)}}.card svg{{width:32px;height:32px}}
#toast{{position:fixed;bottom:20px;right:20px;background:#2638A5;color:#fff;padding:10px 16px;border-radius:8px;display:none;font-size:13px}}
</style></head><body><div class="wrap">
<header><div><h1>02<b>.</b> Meaning &amp; Values Icon Set</h1><p style="font-size:13px;opacity:.7">48 iconos · 24×24 · trazo 1.8 · colores editables vía CSS (--ih-icon-primary / --ih-icon-accent)</p></div>
<div class="controls"><label>Primario <input type="color" id="cp" value="#2638A5"></label><label>Acento <input type="color" id="ca" value="#fc6c21"></label><button onclick="resetColors()">Restablecer</button><a href="../index.html">← Ver Pack 04 (UI Icons)</a></div></header>
{all_sections}
</div><div id="toast"></div>
<script>
const cp=document.getElementById("cp"),ca=document.getElementById("ca"),r=document.documentElement.style;
cp.oninput=e=>r.setProperty("--ih-icon-primary",e.target.value);
ca.oninput=e=>r.setProperty("--ih-icon-accent",e.target.value);
function resetColors(){{cp.value="#2638A5";ca.value="#fc6c21";r.setProperty("--ih-icon-primary","#2638A5");r.setProperty("--ih-icon-accent","#fc6c21")}}
function copy(btn){{navigator.clipboard.writeText(btn.querySelector("svg").outerHTML);const t=document.getElementById("toast");t.textContent="SVG copiado: "+btn.dataset.file;t.style.display="block";setTimeout(()=>t.style.display="none",1800)}}
</script></body></html>"""

with open(os.path.join(BASE_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("Saved preview.png, index.html, and build_icons.py")

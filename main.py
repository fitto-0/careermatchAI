from src.analyzer import analyze_candidate


def read_multiline_input(message):
    """
    Read multiple lines until the user types END.
    """

    print(message)
    print("When finished, type END on a new line.\n")

    lines = []

    while True:
        line = input()

        if line.strip().upper() == "END":
            break

        lines.append(line)

    return "\n".join(lines)


def main():

    print("\n" + "=" * 60)
    print("           CAREERMATCH AI")
    print("     CV & Job Compatibility Analyzer")
    print("=" * 60 + "\n")

    cv_text = read_multiline_input(
        "Enter the candidate's CV:"
    )

    job_description = read_multiline_input(
        "\nEnter the Job Description:"
    )

    print("\n🤖 Analyzing the candidate profile...\n")

    result = analyze_candidate(
        cv_text,
        job_description,
    )

    print("=" * 60)
    print("                 ANALYSIS RESULT")
    print("=" * 60)

    if "error" in result:

        print("\n❌ Error:", result["error"])
        print("\nRaw AI response:\n")
        print(result["raw_response"])
        return

    print(f"\n🎯 MATCH SCORE: {result.get('match_score', 'N/A')}%")

    print(
        f"\n📌 COMPATIBILITY: "
        f"{result.get('compatibility', 'N/A')}"
    )

    print("\n📝 SUMMARY:")
    print(result.get("summary", "N/A"))

    print("\n💪 STRENGTHS:")
    for item in result.get("strengths", []):
        print(f"✓ {item}")

    print("\n⚠️ WEAKNESSES:")
    for item in result.get("weaknesses", []):
        print(f"⚠ {item}")

    print("\n✅ MATCHING SKILLS:")
    for skill in result.get("matching_skills", []):
        print(f"✓ {skill}")

    print("\n❌ MISSING SKILLS:")
    for skill in result.get("missing_skills", []):
        print(f"✗ {skill}")

    print("\n🚀 RECOMMENDATIONS:")
    for recommendation in result.get("recommendations", []):
        print(f"→ {recommendation}")

    print("\n" + "=" * 60)


if __name__ == "__main__":
    main()